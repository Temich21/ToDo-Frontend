const currentPageToText = (currentPage: string) => {
    const pageName = currentPage.split('/')[1]

    switch (pageName) {
        case 'personal-todo':
            return 'Personal ToDo'
        case 'calendar':
            return 'Your Calendar'
        case 'group':
            return 'Group ToDo'
        case 'groups':
            return 'Your Groups'
    }
}

export default currentPageToText