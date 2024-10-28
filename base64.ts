namespace B64Tests {
    export function run(): boolean {
        let allPassed: boolean = true

        let bytes: Uint8Array = new Uint8Array(5)
        bytes.setFromArray([1, 2, 3, 4, 5,])
        let b64: string = Base64.encodeBuffer(bytes.buffer)
        if (b64 != 'AQIDBAU=') {
            game.splash("Base64 test 1a failed.")
            allPassed = false
        }
        let bytesOut: Uint8Array = Base64.decodeBuffer(b64)
        if (!areEquivalent2(bytesOut, bytes)) {
            game.splash("Base64 test 1b failed.")
            allPassed = false
        }

        b64 = 'foocat=='
        let b64Standard: string = Base64.encodeBuffer(Base64.decodeBuffer(b64).buffer)
        if (b64Standard != 'foocag==') {
            game.splash("Base64 test 2 failed.")
            allPassed = false
        }

        try {
            Base64.decodeBuffer('abc')
            game.splash("Base64 test 3a failed.")
            allPassed = false
        } catch {

        }

        try {
            Base64.decodeBuffer('123%')
            game.splash("Base64 test 3b failed.")
            allPassed = false
        } catch {

        }

        return allPassed
    }
}