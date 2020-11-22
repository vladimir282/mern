export const LinkCard = ({link}) => {
    return (
        <>
            <h2>Link</h2>

            <p>Сокращенная ссылка <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>откуда <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Количестко кликов: <strong>{link.clicks}</strong></p>
            <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    )
}