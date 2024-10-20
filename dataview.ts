namespace DataViewTests {
    export function run(): boolean {
        let allPassed: boolean = true

        let tests: (() => boolean)[] = [
            constructors,
            accessors,
            endian,
        ]

        for (let t of tests) {
            if (!t()) {
                allPassed = false
            }
        }

        return allPassed
    }

    function accessors(): boolean {
        let allPassed: boolean = true

        let u: Uint8Array = new Uint8Array(8)
        let d: DataView = new DataView(u.buffer)

        if (!areEquivalent([0, 0, 0, 0, 0, 0, 0, 0,], u)) {
            game.splash("DataView accessor test 1 failed.")
            allPassed = false
        }

        d.setUint8(0, 255)
        if (!areEquivalent([0xff, 0, 0, 0, 0, 0, 0, 0,], u)) {
            game.splash("DataView accessor test 2 failed.")
            allPassed = false
        }

        d.setInt8(1, -1)
        if (!areEquivalent([0xff, 0xff, 0, 0, 0, 0, 0, 0,], u)) {
            game.splash("DataView accessor test 3 failed.")
            allPassed = false
        }

        d.setUint16(2, 0x1234)
        if (!areEquivalent([0xff, 0xff, 0x12, 0x34, 0, 0, 0, 0,], u)) {
            game.splash("DataView accessor test 4 failed.")
            allPassed = false
        }

        d.setInt16(4, -1)
        if (!areEquivalent([0xff, 0xff, 0x12, 0x34, 0xff, 0xff, 0, 0,], u)) {
            game.splash("DataView accessor test 5 failed.")
            allPassed = false
        }

        d.setUint32(1, 0x12345678)
        if (!areEquivalent([0xff, 0x12, 0x34, 0x56, 0x78, 0xff, 0, 0,], u)) {
            game.splash("DataView accessor test 6 failed.")
            allPassed = false
        }

        d.setInt32(4, -2023406815)
        if (!areEquivalent([0xff, 0x12, 0x34, 0x56, 0x87, 0x65, 0x43, 0x21,], u)) {
            game.splash("DataView accessor test 7 failed.")
            allPassed = false
        }

        u.setFromArray([0x80, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87,])
        if (d.getUint8(0) != 128) {
            game.splash("DataView accessor test 8 failed.")
            allPassed = false
        }
        if (d.getInt8(1) != -127) {
            game.splash("DataView accessor test 9 failed.")
            allPassed = false
        }
        if (d.getUint16(2) != 33411) {
            game.splash("DataView accessor test 10 failed.")
            allPassed = false
        }
        if (d.getInt16(3) != -31868) {
            game.splash("DataView accessor test 11 failed.")
            allPassed = false
        }
        if (d.getUint32(4) != 2223343239) {
            game.splash("DataView accessor test 12 failed.")
            allPassed = false
        }
        if (d.getInt32(2) != -2105310075) {
            game.splash("DataView accessor test 13 failed.")
            allPassed = false
        }
        return allPassed
    }

    function constructors(): boolean {
        let allPassed: boolean = true

        // big endian/big endian
        let d: DataView = new DataView(new ArrayBuffer(8))
        d.setUint32(0, 0x12345678)
        if (d.getUint32(0) !== 0x12345678) {
            game.splash("DataView constructor test 1 failed.")
            allPassed = false
        }

        // little endian/little endian
        d.setUint32(0, 0x12345678, true)
        if (d.getUint32(0, true) != 0x12345678) {
            game.splash("DataView constructor test 2 failed.")
            allPassed = false
        }

        // little endian/big endian
        d.setUint32(0, 0x12345678, true)
        if (d.getUint32(0) != 0x78563412) {
            game.splash("DataView constructor test 3 failed.")
            allPassed = false
        }

        // big endian/little endian
        d.setUint32(0, 0x12345678)
        if (d.getUint32(0, true) != 0x78563412) {
            game.splash("DataView constructor test 4 failed.")
            allPassed = false
        }
        
        return allPassed
    }

    function endian(): boolean {
        let allPassed: boolean = true
        let u: Uint8Array = new Uint8Array()
        u.fromArray([0, 1, 2, 3, 4, 5, 6, 7,])
        let rawbuf: ArrayBuffer = u.buffer
        let d: DataView

        d = new DataView(rawbuf)
        if (d.byteLength != 8) {
            game.splash("DataView endian test 1 failed.")
            allPassed = false
        }
        if (d.byteOffset != 0) {
            game.splash("DataView endian test 2 failed.")
            allPassed = false
        }

        try {
            d.getUint8(-2)
            game.splash("DataView endian test 3 failed.")
            allPassed = false
        } catch {
            
        }
        try {
            d.getUint8(8)
            game.splash("DataView endian test 4 failed.")
            allPassed = false
        } catch {

        }
        try {
            d.setUint8(-2, 0)
            game.splash("DataView endian test 5 failed.")
            allPassed = false
        } catch {

        }
        try {
            d.setUint8(8, 0)
            game.splash("DataView endian test 6 failed.")
            allPassed = false
        } catch {

        }

        d = new DataView(rawbuf, 2)
        if (d.byteLength != 6) {
            game.splash("DataView endian test 7 failed.")
            allPassed = false
        }
        if (d.byteOffset != 2) {
            game.splash("DataView endian test 8 failed.")
            allPassed = false
        }
        if (d.getUint8(5) != 7) {
            game.splash("DataView endian test 9 failed.")
            allPassed = false
        }

        try {
            d.getUint8(-2)
            game.splash("DataView endian test 10 failed.")
            allPassed = false
        } catch {

        }
        try {
            d.getUint8(6)
            game.splash("DataView endian test 11 failed.")
            allPassed = false
        } catch {

        }
        try {
            d.setUint8(-2, 0)
            game.splash("DataView endian test 12 failed.")
            allPassed = false
        } catch {

        }
        try {
            d.setUint8(6, 0)
            game.splash("DataView endian test 13 failed.")
            allPassed = false
        } catch {

        }

        d = new DataView(rawbuf, 8)
        if (d.byteLength != 0) {
            game.splash("DataView endian test 14 failed.")
            allPassed = false
        }
        try {
            d = new DataView(rawbuf, -1)
            game.splash("DataView endian test 15 failed.")
            allPassed = false
        } catch {

        }
        try {
            d = new DataView(rawbuf, 9)
            game.splash("DataView endian test 16 failed.")
            allPassed = false
        } catch {

        }
        try {
            d = new DataView(rawbuf, -1)
            game.splash("DataView endian test 17 failed.")
            allPassed = false
        } catch {

        }

        d = new DataView(rawbuf, 2, 4)
        if (d.byteLength != 4) {
            game.splash("DataView endian test 18 failed.")
            allPassed = false
        }
        if (d.byteOffset != 2) {
            game.splash("DataView endian test 19 failed.")
            allPassed = false
        }
        if (d.getUint8(3) != 5) {
            game.splash("DataView endian test 20 failed.")
            allPassed = false
        }
        try {
            d.getUint8(-2)
            game.splash("DataView endian test 21 failed.")
            allPassed = false
        } catch {

        }
        try {
            d.getUint8(4)
            game.splash("DataView endian test 22 failed.")
            allPassed = false
        } catch {

        }
        try {
            d.setUint8(-2, 0)
            game.splash("DataView endian test 23 failed.")
            allPassed = false
        } catch {

        }
        try {
            d.setUint8(4, 0)
            game.splash("DataView endian test 24 failed.")
            allPassed = false
        } catch {

        }

        try {
            d = new DataView(rawbuf, 0, 9)
            game.splash("DataView endian test 25 failed.")
            allPassed = false
        } catch {

        }
        try {
            d = new DataView(rawbuf, 8, 1)
            game.splash("DataView endian test 26 failed.")
            allPassed = false
        } catch {

        }
        try {
            d = new DataView(rawbuf, 9, -1)
            game.splash("DataView endian test 27 failed.")
            allPassed = false
        } catch {

        }
        return allPassed
    }
}