import React, { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth.context";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";

export const DetailPage = () => {
    const linkId = useParams().id
    const [link, setLink] = useState(null);
    const { request, loading } = useHttp();
    const auth = useContext(AuthContext);

    const getLink = useCallback(async () => {
        try {
            const data = await request("/api/link/"+linkId, "GET", null, {
                Authorization: "Bearer " + auth.token
            })
            setLink(data)
        } catch (e) {

        }
    }, [linkId, auth.token, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    )
}