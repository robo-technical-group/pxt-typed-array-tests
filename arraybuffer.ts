namespace ArrayBufferTests {
    export function run(): boolean {
        let allPassed: boolean = true

        let b: ArrayBuffer

        // No length.
        b = new ArrayBuffer()
        if (b.byteLength != 0) {
            game.splash("ArrayBuffer test 1a failed.")
            allPassed = false
        }

        // Creation.
        try {
            b = new ArrayBuffer(0)
        } catch {
            game.splash("ArrayBuffer test 1b failed.")
            allPassed = false
        }

        // Creation.
        try {
            b = new ArrayBuffer(1)
        } catch {
            game.splash("ArrayBuffer test 1c failed.")
            allPassed = false
        }

        // Creation.
        try {
            b = new ArrayBuffer(123)
        } catch {
            game.splash("ArrayBuffer test 1d failed.")
            allPassed = false
        }

        // Length.
        b = new ArrayBuffer(123)
        if (b.byteLength != 123) {
            game.splash("ArrayBuffer test 1e failed.")
            allPassed = false
        }

        // Negative length.
        try {
            b = new ArrayBuffer(-1)
            game.splash("ArrayBuffer test 1f failed.")
            allPassed = false
        } catch {

        }

        // Absurd length.
        try {
            b = new ArrayBuffer(0x80000000)
            game.splash("ArrayBuffer test 1g failed.")
            allPassed = false
        } catch {

        }

        return allPassed
    }
}