function areEquivalent(a: number[], b: TypedArray): boolean {
    if (a.length != b.length) {
        return false
    }
    for (let i: number = 0; i < a.length; i++) {
        if (a[i] != b.get(i)) {
            return false
        }
    }
    return true
}

function areEquivalent2(a: TypedArray, b: TypedArray): boolean {
    if (a.length != b.length) {
        return false
    }
    for (let i: number = 0; i < a.length; i++) {
        if (a.get(i) != b.get(i)) {
            return false
        }
    }
    return true
}