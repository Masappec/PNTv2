function InboxCreatePresenter() {
    return (
        <>
            <div>
                <h2 className="text-center">Mensaje para los supervisores</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere ad voluptates mollitia quis a ullam nulla voluptatibus quaerat vitae! Unde pariatur quasi minus placeat maiores omnis, possimus consequuntur earum quaerat.</p>
                <div className="border flex flex-col mt-24">
                    <input placeholder="Ingrese el titulo" />
                    <input placeholder="Ingrese su mensaje" />
                    <button className="btn btn-primary">Enviar</button>
                </div>
            </div>
        </>
    )
}

export default InboxCreatePresenter