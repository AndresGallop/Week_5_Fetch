async function fetchData(datasource){
    let resource = await fetch(datasource).then(response => {
        // bang operator - means "does ot equal" (or a falsy value)
        if (response.status !== 200) {
            throw new Error(`Danger Will Robinson! Here there be monsters! Error ${response.status}`);
        }

        return response;
    })

    // if we get success, then we can return our resource
    let dataset = await resource.json();

    return dataset;
   }

   // export this to our js
   export { fetchData };