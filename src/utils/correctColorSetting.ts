const correctColorSetting = (priority: number) => {
    switch (priority) {
        case 4:
            return '#53a8b6'
        case 3:
            return '#5585b5'
        case 2:
            return '#F39C12'
        case 1:
            return '#f95959'
    }
}

export default correctColorSetting