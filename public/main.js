const removeBtn = document.querySelectorAll('.removeBtn')

removeBtn.forEach(btn => {
    removeBtn.addEventListener('click', () => {
        fetch('delete', {
            method: 'delete',
            headers: ({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                
            })
        })
    })
})
