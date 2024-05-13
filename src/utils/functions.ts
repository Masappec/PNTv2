

export function url_build(name: string) {
        let name_ = name.replace(/ /g, "-")
        name_ = name_.toLowerCase()
        name_ = name_.replace(/,/g, "")
        name_ = name_.replace(/\./g, "")
        name_ = name_.replace(/ñ/g, "n")
        name_ = name_.replace(/á/g, "a")
        name_ = name_.replace(/é/g, "e")
        name_ = name_.replace(/í/g, "i")
        name_ = name_.replace(/ó/g, "o")
        name_ = name_.replace(/ú/g, "u")
        name_ = name_.replace(/Á/g, "A")
        name_ = name_.replace(/É/g, "E")
        name_ = name_.replace(/Í/g, "I")
        name_ = name_.replace(/Ó/g, "O")
        name_ = name_.replace(/Ú/g, "U")
        name_ = name_.replace(/:/g, "")
        name_ = name_.replace(/;/g, "")
        name_ = name_.replace(/¿/g, "")
        name_ = name_.replace(/\?/g, "")
        name_ = name_.replace(/¡/g, "")
        name_ = name_.replace(/!/g, "")
        name_ = name_.replace(/"/g, "")
        name_ = name_.replace(/'/g, "")
        name_ = name_.replace(/«/g, "")
        name_ = name_.replace(/»/g, "")
        name_ = name_.replace(/“/g, "")
        name_ = name_.replace(/”/g, "")
        name_ = name_.replace(/‘/g, "")
        name_ = name_.replace(/’/g, "")
        name_ = name_.replace(/`/g, "")
        name_ = name_.replace(/´/g, "")
        name_ = name_.replace(/¨/g, "")
        name_ = name_.replace(/~/g, "")
        name_ = name_.replace(/=/g, "")
        name_ = name_.replace(/\+/g, "")
        name_ = name_.replace(/-/g, "")
        name_ = name_.replace(/_/g, "")
        name_ = name_.replace(/@/g, "")
        name_ = name_.replace(/#/g, "")
        name_ = name_.replace(/\$/g, "")
        name_ = name_.replace(/%/g, "")
        name_ = name_.replace(/&/g, "")
        name_ = name_.replace(/\//g, "")

        return name_
}


export const sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function utf8_to_b64(str: string) {
        return window.btoa(unescape(encodeURIComponent(str)));
}

export function b64_to_utf8(str: string) {
        return decodeURIComponent(escape(window.atob(str)));
}