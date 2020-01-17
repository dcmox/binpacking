export interface IBinSize {
    height: number,
    length: number,
    width: number,
}

export interface IBinItem {
    length: number,
    width: number,
    height: number,
    id: string,
}

export interface IBinResult {
    box: TBin,
    results: IBinItemResult[],
    rotations: number,
    unfit: number,
}

export interface IBinItemResult {
    code: string,
    desc: string,
    id: string,
    success: boolean,
}

export interface IBinItemSolution {
    pos: IBinItemPosition,
    item: IBinItem,
    desc: string,
    rotation: boolean,
}

export interface IBinItemPosition {
    x: number,
    y: number,
    z: number
}

export type TBin = string[][][]

export const generateEmptyBin = (height: number, width: number, depth: number): TBin => {
    const layers = []
    for (let j = 0; j < depth; j++) {
        const matrix = new Array(height)
        for (let i = 0; i < height; i++) {
            matrix[i] = new Array(width).fill(' ')
        }
        layers.push(matrix)
    }
    return layers
}

export const getPosition = (matrix: any, item: any): IBinItemPosition => {
    let solution: any = {x: false, y: false, z: false}

    il:
    for (let zo = 0; zo < matrix.length; zo++) {
        for (let yo = 0; yo < matrix[zo].length; yo++) {
            for (let xo = 0; xo < matrix[zo][yo].length; xo++) {
                let isValid = true
                cc:
                for (let y = 0; y < item.height; y++) {
                    for (let x = 0; x < item.width; x++) {
                        for (let z = 0; z < item.length; z++) {
                            if (matrix.length < z + zo + 1
                                || matrix[z + zo].length < y + yo + 1
                                || matrix[z + zo][y + yo].length < x + xo + 1) {
                                isValid = false
                                break cc
                            }
                            if (matrix[z + zo][y + yo][x + xo] !== ' ') {
                                isValid = false
                                break cc
                            }
                        }
                    }
                }
                if (isValid) {
                    solution = { x: xo, y: yo, z: zo }
                    break il
                }
            }
        }
    }

    return solution
}

export const bestFit = (matrix: any[][][], solutions: any[]) => {
    let bsi: number = 0
    solutions.forEach((s, idx) => {
        if (solutions[bsi].pos.x === false) {
            bsi = idx
        }
        if (s.pos.x + s.item.width === matrix[0][0].length &&
            s.pos.y + s.item.height === matrix[0].length) {
            bsi = idx
        }
    })
    return Object.assign({}, solutions[bsi].pos, solutions[bsi].item,
        {rotation: solutions[bsi].rotation},
        {desc: solutions[bsi].desc})
}

export const pack = (matrix: TBin, item: any): IBinItemResult => {
    const o: IBinItemPosition = getPosition(matrix, item)
    const solutions: IBinItemSolution[] = []
    solutions.push({pos: o, item, desc: 'Orientation: Default', rotation: false})

    if (item.height !== item.width) {
        const ri: IBinItem = Object.assign({}, item)
        ri.width = item.height
        ri.height = item.width
        const or: IBinItemPosition = getPosition(matrix, ri)
        solutions.push({pos: or, item: ri, desc: 'Orientation: Rotate W -> H', rotation: true})
    }

    if (item.height !== item.length) {
        const ri: IBinItem = Object.assign({}, item)
        ri.length = item.height
        ri.height = item.length
        const or: IBinItemPosition = getPosition(matrix, ri)
        solutions.push({pos: or, item: ri, desc: 'Orientation: Rotate H -> L', rotation: true})
    }

    if (item.width !== item.length) {
        const ri: IBinItem = Object.assign({}, item)
        ri.length = item.width
        ri.width = item.length
        const or: IBinItemPosition = getPosition(matrix, ri)
        solutions.push({pos: or, item: ri, desc: 'Orientation: Rotate L -> W', rotation: true})
    }

    const fit = bestFit(matrix, solutions)

    if (fit.x !== false) {
        for (let y = 0; y < fit.height; y++) {
            for (let x = 0; x < fit.width; x++) {
                for (let z = 0; z < fit.length; z++) {
                    matrix[z + fit.z][y + fit.y][x + fit.x] = item.id
                }
            }
        }
        if (fit.rotation) {
            return { code: 'ROTATION', desc: fit.desc, id: item.id, success: true }
        } else {
            return { code: 'SUCCESS', desc: fit.desc, id: item.id, success: true }
        }
    } else {
        return { code: 'OVERSIZED', desc: `Item ${item.id} can't fit: ${item.width}x${item.height}x${item.length}`,
        id: item.id, success: false }
    }
}

export const binpack = (boxSize: IBinSize, items: IBinItem[]): IBinResult => {
    const box = generateEmptyBin(boxSize.height, boxSize.width, boxSize.length)
    items.sort((a: IBinItem, b: IBinItem) => a.length * a.width * a.height > b.length * b.width * b.height ? -1 : 1)
    const results: any = []
    let idx: number = 0
    items.forEach((item: IBinItem) => {
        const result = pack(box, item)
        if (result.code !== 'OVERSIZED') { 
            results.push({order: ++idx, ...result})
        } else {
            results.push({order: 'Unfit', ...result})
        }
    })
    const unfit: number = results.filter((r: IBinItemResult) => r.code === 'OVERSIZED').length
    const rotations: number = results.filter((r: IBinItemResult) => r.code === 'ROTATION').length
    results.sort((a: any, b: any) => typeof b === 'string' ? -1 : a.order < b.order ? -1 : 1)
    return { box, results, rotations, unfit }
}

export default binpack
