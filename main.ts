let allPassed: boolean = true

if (!ArrayBufferTests.run()) {
    allPassed = false
}

// Typed arrays.
if (!TypedArraysTests.run()) {
    allPassed = false
}

// DataView constructors.
if (!DataViewTests.run()) {
    allPassed = false
}

if (allPassed) {
    game.splash("All tests passed!")
} else {
    game.splash("At least one test failed.")
}