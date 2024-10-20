namespace TypedArraysTests {
    export function run(): boolean {
        let allPassed: boolean = true

        let tests: (() => boolean)[] = [
            constructors,
            constructors2,
            clone,
            conversions,
            signedConversions,
            i32RoundTrips,
            i16RoundTrips,
            i8RoundTrips,
            typedArraySetting,
        ]

        for (let t of tests) {
            if (!t()) {
                allPassed = false
            }
        }

        return allPassed
    }

    function constructors(): boolean {
        let allPassed: boolean = true

        let a: TypedArray

        a = new Int8Array()
        a.fromArray([1, 2, 3, 4, 5, 6, 7, 8,])
        if (a.bytesPerElement != 1) {
            game.splash("Type arrays constructor test 1a failed.")
            allPassed = false
        }
        if (a.byteOffset != 0) {
            game.splash("Type arrays constructor test 1b failed.")
            allPassed = false
        }
        if (a.byteLength != 8) {
            game.splash("Type arrays constructor test 1c failed.")
            allPassed = false
        }

        a = new Uint8Array()
        a.fromArray([1, 2, 3, 4, 5, 6, 7, 8,])
        if (a.bytesPerElement != 1) {
            game.splash("Type arrays constructor test 2a failed.")
            allPassed = false
        }
        if (a.byteOffset != 0) {
            game.splash("Type arrays constructor test 2b failed.")
            allPassed = false
        }
        if (a.byteLength != 8) {
            game.splash("Type arrays constructor test 2c failed.")
            allPassed = false
        }

        a = new Int16Array()
        a.fromArray([1, 2, 3, 4, 5, 6, 7, 8,])
        if (a.bytesPerElement != 2) {
            game.splash("Type arrays constructor test 3a failed.")
            allPassed = false
        }
        if (a.byteOffset != 0) {
            game.splash("Type arrays constructor test 3b failed.")
            allPassed = false
        }
        if (a.byteLength != 16) {
            game.splash("Type arrays constructor test 3c failed.")
            allPassed = false
        }

        a = new Uint16Array()
        a.fromArray([1, 2, 3, 4, 5, 6, 7, 8,])
        if (a.bytesPerElement != 2) {
            game.splash("Type arrays constructor test 4a failed.")
            allPassed = false
        }
        if (a.byteOffset != 0) {
            game.splash("Type arrays constructor test 4b failed.")
            allPassed = false
        }
        if (a.byteLength != 16) {
            game.splash("Type arrays constructor test 4c failed.")
            allPassed = false
        }

        a = new Int32Array()
        a.fromArray([1, 2, 3, 4, 5, 6, 7, 8,])
        if (a.bytesPerElement != 4) {
            game.splash("Type arrays constructor test 5a failed.")
            allPassed = false
        }
        if (a.byteOffset != 0) {
            game.splash("Type arrays constructor test 5b failed.")
            allPassed = false
        }
        if (a.byteLength != 32) {
            game.splash("Type arrays constructor test 5c failed.")
            allPassed = false
        }

        a = new Uint32Array()
        a.fromArray([1, 2, 3, 4, 5, 6, 7, 8,])
        if (a.bytesPerElement != 4) {
            game.splash("Type arrays constructor test 6a failed.")
            allPassed = false
        }
        if (a.byteOffset != 0) {
            game.splash("Type arrays constructor test 6b failed.")
            allPassed = false
        }
        if (a.byteLength != 32) {
            game.splash("Type arrays constructor test 6c failed.")
            allPassed = false
        }

        return allPassed
    }

    function constructors2(): boolean {
        let allPassed: boolean = true
        let uint8: Uint8Array = new Uint8Array()
        uint8.fromArray([0, 1, 2, 3, 4, 5, 6, 7,])
        let rawbuf: ArrayBuffer = uint8.buffer

        if (!areEquivalent([0, 0, 0,], new Int8Array(3))) {
            game.splash("Type arrays constructor tests II-1 failed.")
            allPassed = false
        }

        // No argument.
        let int8: Int8Array = new Int8Array()
        if (int8.length != 0) {
            game.splash("Type arrays constructor tests II-2 failed.")
            allPassed = false
        }

        // Range errors.
        try {
            int8 = new Int8Array(-1)
            game.splash("Type arrays constructor tests II-3a failed.")
            allPassed = false
        } catch {

        }
        try {
            int8 = new Int8Array(0x80000000)
            game.splash("Type arrays constructor tests II-3b failed.")
            allPassed = false
        } catch {

        }

        // Length.
        int8 = new Int8Array(4)
        if (int8.bytesPerElement != 1) {
            game.splash("Type arrays constructor tests II-4a failed.")
            allPassed = false
        }
        if (int8.length != 4) {
            game.splash("Type arrays constructor tests II-4b failed.")
            allPassed = false
        }
        if (int8.byteLength != 4) {
            game.splash("Type arrays constructor tests II-4c failed.")
            allPassed = false
        }
        if (int8.byteOffset != 0) {
            game.splash("Type arrays constructor tests II-4d failed.")
            allPassed = false
        }
        if (int8.get(-1) !== undefined) {
            game.showLongText(
                `Type arrays constructor tests II-4e failed; returned ${int8.get(-1)} instead.`,
                DialogLayout.Full)
            allPassed = false
        }
        if (int8.get(4) !== undefined) {
            game.showLongText(
                `Type arrays constructor tests II-4e failed; returned ${int8.get(4)} instead.`,
                DialogLayout.Full)
            allPassed = false
        }

        // Array.
        int8.fromArray([1, 2, 3, 4, 5, 6])
        if (int8.length != 6) {
            game.splash("Type arrays constructor tests II-5a failed.")
            allPassed = false
        }
        if (int8.byteLength != 6) {
            game.splash("Type arrays constructor tests II-5b failed.")
            allPassed = false
        }
        if (int8.byteOffset != 0) {
            game.splash("Type arrays constructor tests II-5c failed.")
            allPassed = false
        }
        if (int8.get(3) != 4) {
            game.splash("Type arrays constructor tests II-5d failed.")
            allPassed = false
        }
        if (int8.get(-1) !== undefined) {
            game.splash("Type arrays constructor tests II-5e failed.")
            allPassed = false
        }
        if (int8.get(6) !== undefined) {
            game.splash("Type arrays constructor tests II-5f failed.")
            allPassed = false
        }

        // Buffer.
        int8.fromArrayBuffer(rawbuf)
        if (int8.length != 8) {
            game.splash("Type arrays constructor tests II-6a failed.")
            allPassed = false
        }
        if (int8.byteLength != 8) {
            game.splash("Type arrays constructor tests II-6b failed.")
            allPassed = false
        }
        if (int8.byteOffset != 0) {
            game.splash("Type arrays constructor tests II-6c failed.")
            allPassed = false
        }
        if (int8.get(7) != 7) {
            game.splash("Type arrays constructor tests II-6d failed.")
            allPassed = false
        }
        int8.setFromArray([111,])
        if (int8.get(0) != 111) {
            game.splash("Type arrays constructor tests II-6e failed.")
            allPassed = false
        }
        if (int8.get(-1) !== undefined) {
            game.splash("Type arrays constructor tests II-6f failed.")
            allPassed = false
        }
        if (int8.get(8) !== undefined) {
            game.splash("Type arrays constructor tests II-6g failed.")
            allPassed = false
        }

        // Buffer with byteOffset.
        int8.fromArrayBuffer(rawbuf, 2)
        if (int8.length != 6) {
            game.splash("Type arrays constructor tests II-7a failed.")
            allPassed = false
        }
        if (int8.byteLength != 6) {
            game.splash("Type arrays constructor tests II-7b failed.")
            allPassed = false
        }
        if (int8.byteOffset != 2) {
            game.splash("Type arrays constructor tests II-7c failed.")
            allPassed = false
        }
        if (int8.get(5) != 7) {
            game.splash("Type arrays constructor tests II-7d failed.")
            allPassed = false
        }
        int8.setFromArray([112,])
        if (int8.get(0) != 112) {
            game.splash("Type arrays constructor tests II-7e failed.")
            allPassed = false
        }
        if (int8.get(-1) !== undefined) {
            game.splash("Type arrays constructor tests II-7f failed.")
            allPassed = false
        }
        if (int8.get(6) !== undefined) {
            game.splash("Type arrays constructor tests II-7g failed.")
            allPassed = false
        }

        int8.fromArrayBuffer(rawbuf, 8)
        if (int8.length != 0) {
            game.splash("Type arrays constructor tests II-7h failed.")
            allPassed = false
        }

        try {
            int8.fromArrayBuffer(rawbuf, -1)
            game.splash("Type arrays constructor tests II-7i failed.")
            allPassed = false
        } catch {
            
        }

        try {
            int8.fromArrayBuffer(rawbuf, 9)
            game.splash("Type arrays constructor tests II-7j failed.")
            allPassed = false
        } catch {

        }

        let int32: Int32Array = new Int32Array()
        try {
            int32.fromArrayBuffer(rawbuf, -1)
            game.splash("Type arrays constructor tests II-7k failed.")
            allPassed = false
        } catch {

        }

        try {
            int32.fromArrayBuffer(rawbuf, 5)
            game.splash("Type arrays constructor tests II-7l failed.")
            allPassed = false
        } catch {

        }

        // Buffer with byteOffset and length.
        int8.fromArrayBuffer(rawbuf, 2, 4)
        if (int8.length != 4) {
            game.splash("Type arrays constructor tests II-8a failed.")
            allPassed = false
        }
        if (int8.byteLength != 4) {
            game.splash("Type arrays constructor tests II-8b failed.")
            allPassed = false
        }
        if (int8.byteOffset != 2) {
            game.splash("Type arrays constructor tests II-8c failed.")
            allPassed = false
        }
        if (int8.get(3) != 5) {
            game.splash("Type arrays constructor tests II-8d failed.")
            allPassed = false
        }
        int8.setFromArray([113,])
        if (int8.get(0) != 113) {
            game.splash("Type arrays constructor tests II-8e failed.")
            allPassed = false
        }
        if (int8.get(-1) !== undefined) {
            game.splash("Type arrays constructor tests II-8f failed.")
            allPassed = false
        }
        if (int8.get(4) !== undefined) {
            game.splash("Type arrays constructor tests II-8g failed.")
            allPassed = false
        }

        try {
            int8.fromArrayBuffer(rawbuf, 0, 9)
            game.splash("Type arrays constructor tests II-8h failed.")
            allPassed = false
        } catch {

        }

        try {
            int8.fromArrayBuffer(rawbuf, 8, 1)
            game.splash("Type arrays constructor tests II-8i failed.")
            allPassed = false
        } catch {

        }

        try {
            int8.fromArrayBuffer(rawbuf, 9, -1)
            game.splash("Type arrays constructor tests II-8j failed.")
            allPassed = false
        } catch {

        }
       return allPassed
    }

    function clone(): boolean {
        let allPassed: boolean = true

        let src: Int32Array = new Int32Array()
        let dst: Int32Array = new Int32Array()

        src.fromArray([1, 2, 3, 4, 5, 6, 7, 8,])
        dst.fromTypedArray(src)
        if (!areEquivalent([1, 2, 3, 4, 5, 6, 7, 8,], dst)) {
            game.splash("Clone test 1 failed.")
            allPassed = false
        }
        src.setFromArray([99,])
        if (!areEquivalent([99, 2, 3, 4, 5, 6, 7, 8,], src)) {
            game.splash("Clone test 2 failed.")
            allPassed = false
        }
        if (!areEquivalent([1, 2, 3, 4, 5, 6, 7, 8,], dst)) {
            game.splash("Clone test 3 failed.")
            allPassed = false
        }
        return allPassed
    }

    function conversions(): boolean {
        let allPassed: boolean = true

        let uint8: Uint8Array = new Uint8Array()
        let uint16: Uint32Array = new Uint16Array()
        let uint32: Uint32Array = new Uint32Array()

        uint8.fromArray([1, 2, 3, 4,])
        uint16.fromArrayBuffer(uint8.buffer)
        uint32.fromArrayBuffer(uint8.buffer)

        // Note: Cannot probe individual bytes without endianness awareness.
        if (!areEquivalent([1, 2, 3, 4,], uint8)) {
            game.splash("Conversions test 1 failed.")
            allPassed = false
        }
        uint16.setFromArray([0xffff,])
        if (!areEquivalent([0xff, 0xff, 3, 4,], uint8)) {
            game.splash("Conversions test 2 failed.")
            allPassed = false
        }
        uint16.setFromArray([0xeeee,], 1)
        if (!areEquivalent([0xff, 0xff, 0xee, 0xee,], uint8)) {
            game.splash("Conversions test 3 failed.")
            allPassed = false
        }
        uint32.setFromArray([0x11111111,])
        if (uint16.get(0) != 0x1111) {
            game.splash("Conversions test 4 failed.")
            allPassed = false
        }
        if (uint16.get(1) != 0x1111) {
            game.splash("Conversions test 5 failed.")
            allPassed = false
        }
        if (!areEquivalent([0x11, 0x11, 0x11, 0x11,], uint8)) {
            game.splash("Conversions test 6 failed.")
            allPassed = false
        }
        return allPassed
    }

    function signedConversions(): boolean {
        let allPassed: boolean = true

        let int8: Int8Array = new Int8Array(1)
        let uint8: Uint8Array = new Uint8Array()
        uint8.fromArrayBuffer(int8.buffer)
        uint8.setFromArray([123,])
        if (int8.get(0) != 123) {
            game.splash("Signed conversions test 1 failed.")
            allPassed = false
        }
        uint8.setFromArray([161,])
        if (int8.get(0) != -95) {
            game.splash("Signed conversions test 2 failed.")
            allPassed = false
        }
        int8.setFromArray([-120,])
        if (uint8.get(0) != 136) {
            game.splash("Signed conversions test 3 failed.")
            allPassed = false
        }
        int8.setFromArray([-1,])
        if (uint8.get(0) != 0xff) {
            game.splash("Signed conversions test 4 failed.")
            allPassed = false
        }

        let int16: Int16Array = new Int16Array(1)
        let uint16: Uint16Array = new Uint16Array()
        uint16.fromArrayBuffer(int16.buffer)
        uint16.setFromArray([3210,])
        if (int16.get(0) != 3210) {
            game.splash("Signed conversions test 5 failed.")
            allPassed = false
        }
        uint16.setFromArray([49232,])
        if (int16.get(0) != -16304) {
            game.splash("Signed conversions test 6 failed.")
            allPassed = false
        }
        int16.setFromArray([-16384,])
        if (uint16.get(0) != 49152) {
            game.splash("Signed conversions test 7 failed.")
            allPassed = false
        }
        int16.setFromArray([-1,])
        if (uint16.get(0) != 0xffff) {
            game.splash("Signed conversions test 8 failed.")
            allPassed = false
        }

        let int32: Int32Array = new Int32Array(1)
        let uint32: Uint32Array = new Uint32Array()
        uint32.fromArrayBuffer(int32.buffer)
        uint32.setFromArray([0x80706050,])
        if (int32.get(0) != -2140118960) {
            game.splash("Signed conversions test 9 failed.")
            allPassed = false
        }
        int32.setFromArray([-2023406815,])
        if (uint32.get(0) != 0x87654321) {
            game.splash("Signed conversions test 10 failed.")
            allPassed = false
        }
        int32.setFromArray([-1,])
        if (uint32.get(0) != 0xffffffff) {
            game.splash("Signed conversions test 11 failed.")
            allPassed = false
        }
        return allPassed
    }

    function i32RoundTrips(): boolean {
        let allPassed: boolean = true

        let i32: Int32Array = new Int32Array(1)
        let data: number[] = [
            0,
            1,
            -1,
            123,
            -456,
            0x80000000 >> 0,
            0x7fffffff >> 0,
            0x12345678 >> 0,
            0x87654321 >> 0,
        ]

        for (let i: number = 0; i < data.length; i++) {
            let datum: number = data[i]
            i32.setFromArray([datum,])
            if (datum != i32.get(0)) {
                game.splash(`Int32 round trips test ${i} (${datum}) failed.`)
                allPassed = false
            }
        }
        return allPassed
    }

    function i16RoundTrips(): boolean {
        let allPassed: boolean = true

        let i16: Int16Array = new Int16Array(1)
        let data: number[] = [
            0,
            1,
            -1,
            123,
            -456,
            0xffff8000 >> 0,
            0x00007fff >> 0,
            0x00001234 >> 0,
            0xffff8765 >> 0,
        ]

        for (let i: number = 0; i < data.length; i++) {
            let datum: number = data[i]
            i16.setFromArray([datum,])
            if (datum != i16.get(0)) {
                game.splash(`Int16 round trips test ${i} (${datum}) failed.`)
                allPassed = false
            }
        }
        return allPassed
    }

    function i8RoundTrips(): boolean {
        let allPassed: boolean = true

        let i8: Int8Array = new Int8Array(1)
        let data: number[] = [
            0,
            1,
            -1,
            123,
            -45,
            0xffffff80 >> 0,
            0x0000007f >> 0,
            0x00000012 >> 0,
            0xffffff87 >> 0,
        ]

        for (let i: number = 0; i < data.length; i++) {
            let datum: number = data[i]
            i8.setFromArray([datum,])
            if (datum != i8.get(0)) {
                game.splash(`Int8 round trips test ${i} (${datum}) failed.`)
                allPassed = false
            }
        }
        return allPassed
    }

    function typedArraySetting(): boolean {
        let allPassed: boolean = true

        let a: Int32Array = new Int32Array()
        a.fromArray([1, 2, 3, 4, 5,])
        let b: Int32Array = new Int32Array(5)
        b.setFromTypedArray(a)
        if (!areEquivalent([1, 2, 3, 4, 5,], b)) {
            game.splash("Set from typed array test 1 failed.")
            allPassed = false
        }

        let _: Int32Array = new Int32Array()
        _.fromArray([99, 98,])
        b.setFromTypedArray(_, 2)
        if (!areEquivalent([1, 2, 99, 98, 5,], b)) {
            game.splash("Set from typed array test 2 failed.")
            allPassed = false
        }
        _.fromArray([99, 98, 97,])
        b.setFromTypedArray(_, 2)
        if (!areEquivalent([1, 2, 99, 98, 97,], b)) {
            game.splash("Set from typed array test 3 failed.")
            allPassed = false
        }

        _.fromArray([99, 98, 97, 96,])
        try {
            b.setFromTypedArray(_, 2)
            game.splash("Set from typed array test 4 failed.")
            allPassed = false
        } catch {

        }

        try {
            b.setFromArray([101, 102, 103, 104,], 4)
            game.splash("Set from typed array test 5 failed.")
            allPassed = false
        } catch {

        }

        //  ab = [ 0, 1, 2, 3, 4, 5, 6, 7 ]
        //  a1 = [ ^, ^, ^, ^, ^, ^, ^, ^ ]
        //  a2 =             [ ^, ^, ^, ^ ]
        let ab: ArrayBuffer = new ArrayBuffer(8)
        let a1: Uint8Array = new Uint8Array()
        a1.fromArrayBuffer(ab)
        for (let i: number = 0; i < a1.length; i++) {
            a1.setFromArray([i,], i)
        }
        let a2: Uint8Array = new Uint8Array()
        a2.fromArrayBuffer(ab, 4)
        a1.setFromTypedArray(a2, 2)
        if (!areEquivalent([0, 1, 4, 5, 6, 7, 6, 7,], a1)) {
            game.splash("Set from typed array test 6 failed.")
            allPassed = false
        }
        if (!areEquivalent([6, 7, 6, 7], a2)) {
            game.splash("Set from typed array test 7 failed.")
            allPassed = false
        }
        return allPassed
    }
}