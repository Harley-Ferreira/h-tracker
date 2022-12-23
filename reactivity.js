const project = {
    id: 1,
    descritption: 'Alura'
}


const proxy = new Proxy(project,  {
    get(originalObject, key) {
        console.log(`SOmeone aks the key project ${key}`)
        return originalObject;
    },

    set(originalObject, key, value) {
        console.log(`Someone changed the key ${key}`)
        originalObject[key] = value;
    }
})