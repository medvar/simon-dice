access = async() => {
    let data = {}
    data['user'] = document.getElementById('user').value
    data['pass'] = document.getElementById('pass').value
    const res = await request({ url: 'access', data: data, method: 'post' })
    if (res.status == 200) {
        //console.log(await res.json())
        location.href = 'home'
    } else {
        console.log(await res.json())
        $('#ErorMensaje').text('Usuario o contraseña incorrectos')
    }
}