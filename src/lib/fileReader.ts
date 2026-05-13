export function fileReader (file: File): Promise<string> {

    return new Promise((resolve, reject) => {

        let reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            resolve(reader.result as string)
        }

        reader.onerror = function() {
            console.error(reader.error);
            reject
        };

    })

}