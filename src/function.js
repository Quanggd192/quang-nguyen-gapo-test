export const suggest = async key => {
    let url = "http://localhost:8080/get-list-suggestion?key="+key
    let result = await fetch(url).then(res => res.json())
    return result.listSuggestion
}

export const getListUser = async (key,page, sort, filter) => {
  let url = "http://localhost:8080/get-list-user?key="+key+"&page="+page+"&sort="+sort+"&filter="+filter
  let result = await fetch(url).then(res => res.json())
  return result
}
export const removeUser = async (user_id, key, page) => {
  let url = "http://localhost:8080/remove-user"
  let result = await fetch(url, {
    method: "post",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        user_id: user_id,
        key: key,
        page: page
    })
  }).then(res => res.json())
  return result
}

export const createNewUser = async (user, key, page) => {
    // code here
  let url = "http://localhost:8080/create-new-user"
  let result = await fetch(url, {
    method: "post",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        user: user,
        key: key,
        page: page
    })
  }).then(res => res.json())
  return result
}
