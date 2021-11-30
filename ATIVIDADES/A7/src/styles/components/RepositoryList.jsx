const repository = {
    name: "Atividade",
    description: "Descrição da atividade",
    link: "https://github.com/gustavofre/SEGA4"
}

export function RepositoryList (){
    return (
        <>
            <RepositoryList repository={repository}/>
            <Counter />
        </>
    )
}