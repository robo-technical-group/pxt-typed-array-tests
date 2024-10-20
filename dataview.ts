namespace DataViewTests {
    export function run(): boolean {
        let allPassed: boolean = true

        // big endian/big endian
        let d: DataView = new DataView(new ArrayBuffer(8))
        d.setUint32(0, 0x12345678)
        if (d.getUint32(0) !== 0x12345678) {
            game.splash("DataView test 1a failed.")
            allPassed = false
        }

        // little endian/little endian
        d.setUint32(0, 0x12345678, true)
        if (d.getUint32(0, true) != 0x12345678) {
            game.splash("DataView test 1b failed.")
            allPassed = false
        }

        // little endian/big endian
        d.setUint32(0, 0x12345678, true)
        if (d.getUint32(0) != 0x78563412) {
            game.splash("DataView test 1c failed.")
            allPassed = false
        }

        // big endian/little endian
        d.setUint32(0, 0x12345678)
        if (d.getUint32(0, true) != 0x78563412) {
            game.splash("DataView test 1d failed.")
            allPassed = false
        }
        
        return allPassed
    }
}