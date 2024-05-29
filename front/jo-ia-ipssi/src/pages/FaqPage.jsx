import React from 'react'
import ListFaqJO from '../components/ListFaqJO'
import Layout from '../components/Layout'

export default function FaqPage() {
    return (
        <div>
            <Layout>
                <div className="container mt-5">
                    <h1 className="text-center">FAQ</h1>

                    <div className="row justify-content-center">
                        <ListFaqJO />
                    </div>
                </div>
            </Layout>
        </div>
    )
}
