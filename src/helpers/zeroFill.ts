const zeroFill = (value: string, n: number): string  => {
    return  ("000000" + value).slice(-n)
}

export default zeroFill
