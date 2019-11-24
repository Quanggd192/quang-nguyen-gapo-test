module.exports = {
    getListUser(allUsers, key, page, sort, filter) {
        allUsers = allUsers.filter(e => {
            return e.display_name.toUpperCase().includes(key.toUpperCase().trim())
        })
        if(sort === "name")
            allUsers.sort(sortByName)
        else if(sort === "id-increase")    
            allUsers.sort(sortByIdIncrease)
        else if(sort === "id-decrease") 
            allUsers.sort(sortByIdDecrease)   
        let numOfPages = allUsers.length % 6 > 0 ? Math.floor(allUsers.length/6) + 1 : allUsers.length/6
        if(page > numOfPages && numOfPages > 0) 
            return null
        let listUsers = allUsers.slice((page - 1)*6, page*6)
        return {
            listUsers: listUsers,
            numOfPages: numOfPages
        }
    },
    getListSuggestion(allSuggestions,key){
        let listSuggestion = allSuggestions.filter(e => {
            if((" " + e.toUpperCase()).includes( " " + key.toUpperCase().trim()))
                return e
        })
        return {
            listSuggestion
        }
    },

    createUser(data, user, file, jsonFile){
        user.createdAt = new Date()
        data.listUsers.push(user)
        if(data.listSuggestion.indexOf(user.display_name) < 0)
            data.listSuggestion.push(user.display_name)
        jsonFile.writeFile(file, data, { spaces: 2, EOL: '\r\n' }, function (err) {
            if (err) {
                console.log(err)
                return {
                    success: false
                }
            }
            return {success: true}
        })        
    },
    removeUser(data, file, jsonFile) {
        jsonFile.writeFile(file, data, { spaces: 2, EOL: '\r\n' }, function (err) {
            if (err) {
                console.log(err)
                return {
                    success: false
                }
            }
            return {success: true}
        })        
    }
} 


const sortByName = (a,b) => {
    if ( a.display_name.toUpperCase() > b.display_name.toUpperCase())
        return 1;
    if ( a.display_name.toUpperCase() < b.display_name.toUpperCase())
        return -1;
    return 0;
}
const sortByIdIncrease = (a,b) => {
    if ( a.id > b.id)
        return 1;
    if ( a.id < b.id)
        return -1;
    return 0;
}
const sortByIdDecrease = (a,b) => {
    if ( a.id < b.id)
        return 1;
    if ( a.id > b.id)
        return -1;
    return 0;
}
