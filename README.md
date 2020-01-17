# binpacking
Simple binpacking algorithm for packing items in a 3D space.

## Usage
```typescript
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
```

## Sample results
```json
{
  "box": [
    [
      ["E", "E", "E", "E", "F"],
      ["E", "E", "E", "E", "F"],
      ["E", "E", "E", "E", "F"],
      ["E", "E", "E", "E", "F"],
      ["J", "J", "J", "C", "F"]
    ],
    [
      ["E", "E", "E", "E", "N"],
      ["E", "E", "E", "E", "N"],
      ["E", "E", "E", "E", "N"],
      ["E", "E", "E", "E", "R"],
      ["O", "O", "O", "C", "R"]
    ],
    [
      ["B", "B", "G", "G", "M"],
      ["B", "B", "G", "G", "M"],
      ["B", "B", "K", "Q", "M"],
      ["L", "L", "L", "Q", "P"],
      ["H", "H", "H", "C", "P"]
    ]
  ],
  "results": [
    {
      "order": 1,
      "code": "SUCCESS",
      "desc": "Orientation: Default",
      "id": "E",
      "success": true
    },
    {
      "order": 2,
      "code": "SUCCESS",
      "desc": "Orientation: Default",
      "id": "B",
      "success": true
    },
    {
      "order": 3,
      "code": "ROTATION",
      "desc": "Orientation: Rotate W -> H",
      "id": "F",
      "success": true
    },
    {
      "order": 4,
      "code": "SUCCESS",
      "desc": "Orientation: Default",
      "id": "G",
      "success": true
    },
    {
      "order": 5,
      "code": "SUCCESS",
      "desc": "Orientation: Default",
      "id": "J",
      "success": true
    },
    {
      "order": 6,
      "code": "SUCCESS",
      "desc": "Orientation: Default",
      "id": "O",
      "success": true
    },
    {
      "order": 7,
      "code": "SUCCESS",
      "desc": "Orientation: Default",
      "id": "N",
      "success": true
    },
    {
      "order": 8,
      "code": "SUCCESS",
      "desc": "Orientation: Default",
      "id": "M",
      "success": true
    },
    {
      "order": 9,
      "code": "SUCCESS",
      "desc": "Orientation: Default",
      "id": "L",
      "success": true
    },
    {
      "order": 10,
      "code": "SUCCESS",
      "desc": "Orientation: Default",
      "id": "C",
      "success": true
    },
    {
      "order": 11,
      "code": "ROTATION",
      "desc": "Orientation: Rotate W -> H",
      "id": "H",
      "success": true
    },
    {
      "order": 12,
      "code": "ROTATION",
      "desc": "Orientation: Rotate H -> L",
      "id": "R",
      "success": true
    },
    {
      "order": 13,
      "code": "SUCCESS",
      "desc": "Orientation: Default",
      "id": "Q",
      "success": true
    },
    {
      "order": 14,
      "code": "ROTATION",
      "desc": "Orientation: Rotate W -> H",
      "id": "P",
      "success": true
    },
    {
      "order": 15,
      "code": "SUCCESS",
      "desc": "Orientation: Default",
      "id": "K",
      "success": true
    },
    {
      "order": "Unfit",
      "code": "OVERSIZED",
      "desc": "Item D can't fit: 2x2x2",
      "id": "D",
      "success": false
    },
    {
      "order": "Unfit",
      "code": "OVERSIZED",
      "desc": "Item A can't fit: 2x2x2",
      "id": "A",
      "success": false
    }
  ],
  "rotations": 4,
  "unfit": 2
}
BinPack time: 54.064ms
```

## TODO
Needs unit testing and 3D visualization of packing results.