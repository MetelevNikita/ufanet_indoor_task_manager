import Input from "@/ui/Input/Input"
import Select from "@/ui/Select/Select"
import File from "@/ui/File/File"
import Area from "@/ui/Area/Area"



export class FieldClassInput {


    private id: number
    private name: string
    private placeholder: string
    private title: string
    private type: string


    constructor(id: number, name: string, placeholder: string, title: string, type: string) {
        this.id = id
        this.name = name
        this.placeholder = placeholder
        this.title = title,
        this.type = type
    }

    createField (value: string, onChange: (e: any) => any) {

        if (this.type === 'input') {
            return (
                <Input key={this.id} title={this.title} value={value} placeholder={this.placeholder} onChange={onChange} />
            )
         
        }
    }
}


export class FieldClassSelector {
    private id: number
    private name: string
    private title: string
    private type: string


    constructor(id: number, name: string, title: string, type: string) {
        this.id = id
        this.name = name
        this.title = title,
        this.type = type
    }

    createField (value: string, onChange: (e: any) => any, arr: {id: number, label: string, value: string} | any) {

        if (this.type === 'select') {
            return (
                <Select
                    key={this.id}
                    title={this.title}
                    value={value}
                    onChange={onChange}
                    arr={arr}
                    data={value ?? []}
                />
            )
         
        }
    }
}


export class FieldClassFile {

    id: number
    name: string
    title: string
    placeholder: string
    type: string

    constructor(id: number, name: string, title: string, placeholder: string, type: string) {
        this.id = id
        this.name = name,
        this.title = title,
        this.placeholder = placeholder
        this.type = type
    }


    createField (value: File | any, onChange: (e: any) => any) {
        return <File
                    title={this.title}
                    placeholder={this.placeholder}
                    value={value}
                    onChange={onChange}
                    data={value} />
    }
}


export class FieldClassArea {

    constructor () {}

    createField () {

    }
}