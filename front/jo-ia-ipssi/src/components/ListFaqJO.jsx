import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';

export default function ListFaqJO() {
    const [faqList, setFaqList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchFaqList(page);
    }, [page]);

    const fetchFaqList = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-faq/records?limit=20&offset=${(page - 1)}&lang=fr`
            );
            setFaqList((prevFaqList) => [...prevFaqList, ...response.data.results]);
            setHasMore(response.data.results.length > 0);
        } catch (error) {
            console.error('Error fetching FAQ list:', error);
        }
        setLoading(false);
    };

    const handleScroll = useCallback(() => {
        if (Math.round(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight) {
            if (!loading && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    }, [loading, hasMore]);
console.log(Math.round(window.innerHeight + document.documentElement.scrollTop), document.documentElement.offsetHeight)
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className="col-12 col-md-8 mt-4">
            <Accordion defaultActiveKey="0">
                {faqList.map((faq, index) => (
                    <Accordion.Item key={index} eventKey={faq.id}>
                        <Accordion.Header>{faq.label}</Accordion.Header>
                        <Accordion.Body>
                       {faq.body}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
            {loading && <div className='text-center mt-5'>Chargement...</div>}
        </div>
    );
}
