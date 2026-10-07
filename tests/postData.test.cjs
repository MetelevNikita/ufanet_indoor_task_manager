const assert = require('node:assert/strict');

// Run: node --experimental-strip-types tests/postData.test.cjs
async function check() {
  const { postData } = await import('../src/functions/postData.ts');
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async () => Response.json({ id: 'task-123' });
    assert.deepEqual(await postData('https://example.test/tasks', {}, 'Создано', 'Ошибка'), {
      success: true, message: 'Создано', data: { id: 'task-123' },
    });

    globalThis.fetch = async () => Response.json({ error: 'Denied' }, { status: 403 });
    const failed = await postData('https://example.test/tasks', {}, 'Создано', 'Ошибка');
    assert.equal(failed.success, false);
    assert.equal(failed.data, null);
    assert.match(failed.message, /403/);

    globalThis.fetch = async () => { throw new Error('Network error'); };
    assert.equal((await postData('https://example.test/tasks', {}, 'Создано', 'Ошибка')).success, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

check().catch(error => { console.error(error); process.exitCode = 1; });
