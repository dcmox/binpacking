import { binpack, IBinItem } from '../binpack'

const items: IBinItem[] = [
    {length: 2, width: 2, height: 2, id: 'A'},
    {length: 1, width: 2, height: 3, id: 'B'},
    {length: 3, width: 1, height: 1, id: 'C'},
    {length: 2, width: 2, height: 2, id: 'D'},
    {length: 2, width: 4, height: 4, id: 'E'},
    {length: 1, width: 5, height: 1, id: 'F'},
    {length: 1, width: 2, height: 2, id: 'G'},
    {length: 1, width: 1, height: 3, id: 'H'},
    {length: 1, width: 3, height: 1, id: 'J'},
    {length: 1, width: 1, height: 1, id: 'K'},
    {length: 1, width: 3, height: 1, id: 'L'},
    {length: 1, width: 1, height: 3, id: 'M'},
    {length: 1, width: 1, height: 3, id: 'N'},
    {length: 1, width: 3, height: 1, id: 'O'},
    {length: 1, width: 2, height: 1, id: 'P'},
    {length: 1, width: 1, height: 2, id: 'Q'},
    {length: 2, width: 1, height: 1, id: 'R'},
]

const bin = {width: 5, height: 5, length: 3}

console.time('BinPack time')
const results = binpack(bin, items)
console.log(results)
console.timeEnd('BinPack time')