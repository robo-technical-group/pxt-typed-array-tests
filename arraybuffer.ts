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

        let buf: ArrayBuffer = create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9,])
        if (buf.byteLength != 10) {
            game.splash("Array buffer slice test 1 failed.")
            allPassed = false
        }
        if (buf.slice(5).byteLength != 5) {
            game.splash("Array buffer slice test 2 failed.")
            allPassed = false
        }
        if (buf.slice(-2).byteLength != 2) {
            game.splash("Array buffer slice test 3 failed.")
            allPassed = false
        }
        if (buf.slice(-4, -2).byteLength != 2) {
            game.splash("Array buffer slice test 4 failed.")
            allPassed = false
        }
        if (buf.slice(-1000, 5).byteLength != 5) {
            game.splash("Array buffer slice test 5 failed.")
            allPassed = false
        }
        if (!areEquivalent3([5, 6, 7, 8, 9,], buf.slice(5))) {
            game.splash("Array buffer slice test 6 failed.")
            allPassed = false
        }
        if (!areEquivalent3([0, 1, 2, 3, 4,], buf.slice(0, 5))) {
            game.splash("Array buffer slice test 7 failed.")
            allPassed = false
        }
        if (!areEquivalent3([5, 6,], buf.slice(5, 7))) {
            game.splash("Array buffer slice test 8 failed.")
            allPassed = false
        }
        if (!areEquivalent3([6, 7,], buf.slice(-4, -2))) {
            game.splash("Array buffer slice test 9 failed.")
            allPassed = false
        }
        if (!areEquivalent3([2, 3, 4, 5, 6, 7,], buf.slice(2, -2))) {
            game.splash("Array buffer slice test 10 failed.")
            allPassed = false
        }

        return allPassed
    }

    function create(bytes: number[]): ArrayBuffer {
        let buffer: ArrayBuffer = new ArrayBuffer(bytes.length)
        let array: Uint8Array = new Uint8Array()
        array.fromArrayBuffer(buffer)

        for (let i: number = 0; i < bytes.length; i++) {
            array.set(i, bytes[i])
        }

        return buffer
    }
}