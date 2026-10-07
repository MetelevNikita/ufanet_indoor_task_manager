const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

// Run: node tests/taskTelegram.test.cjs (no external requests)
async function check() {
  const source = ts.createSourceFile('route.ts', fs.readFileSync('src/app/api/task/route.ts', 'utf8'), ts.ScriptTarget.Latest, true);
  const blocks = [];
  function visit(node) {
    if (ts.isTryStatement(node) && node.tryBlock.statements.some(statement => ts.isVariableStatement(statement) && statement.getText(source).startsWith('const resultTG ='))) blocks.push(node);
    ts.forEachChild(node, visit);
  }
  visit(source);
  assert.equal(blocks.length, 3);
  for (const block of blocks) {
    const code = ts.transpile(`async function send(telegramBot, console, messageTelegram) { ${block.getText(source)} }`, { target: ts.ScriptTarget.ESNext });
    const send = new Function(`${code}; return send;`)();
    const logs = [];
    const logger = { info: (...args) => logs.push(args) };
    await send(async () => ({ sendMessage: async () => ({ message_id: 123 }) }), logger, 'Заявка');
    assert.deepEqual(logs, [['Заявка в Telegram успешно отправлена', { messageId: 123 }]]);
    for (const failedBot of [
      async () => { throw new Error('Missing token'); },
      async () => ({ sendMessage: async () => { throw new Error('Telegram unavailable'); } }),
    ]) {
      logs.length = 0;
      await assert.rejects(send(failedBot, logger, 'Заявка'), error => {
        assert.match(error.message, /^Ошибка отправки заявки в Telegram:/);
        assert(error.cause instanceof Error);
        return true;
      });
      assert.equal(logs.length, 0);
    }
  }
}

check().catch(error => { console.error(error); process.exitCode = 1; });
