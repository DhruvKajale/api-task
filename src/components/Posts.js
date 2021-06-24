import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from "lodash";

const pageSize = 100;
const Posts = () => {
    const [posts, setposts] = useState([]);
    const [paginatedPosts, setpaginatedPosts] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [searchFilter, setsearchFilter] = useState("");
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(res => {
                console.log(res.data);
                setposts(res.data);
                setpaginatedPosts(_(res.data).slice(0).take(pageSize).value());
            });
    }, []);

    const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0;
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    const pagination = (pageNo) => {
        setcurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
        setpaginatedPosts(paginatedPost)
    }

    return <div>
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <form className="d-flex">
                    <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search"
                        onChange={(e) => setsearchFilter(e.target.value)} />                </form>
            </div>
        </nav>
        {!paginatedPosts ? ("NO data found") : (
            <div className="container-fluid">
                <div className="row text-center">
                    {
                        paginatedPosts.filter((value) => {
                            if (searchFilter === "") {
                                return value
                            }
                            else if (value.title.toLowerCase().includes(searchFilter.toLowerCase())) {
                                return value
                            }
                        }).map((posts) => {
                            return (
                                <div className="col-md-4 mt-5">
                                    <div className="card p-2">
                                        <div className="align-items-center">
                                            <div className="image d-flex">
                                                <img src={posts.thumbnailUrl} alt='img ' className="rounded" width="auto" />
                                                <div className="ml-3 w-100 " >
                                                    <h4 className="mb-0 mt-0 ">
                                                        {posts.title}
                                                    </h4>
                                                    <hr />
                                                    <a href={posts.url} className="mb-0 mt-0 ">
                                                        Image
                                                    </a>
                                                    <span className="verticalLine" />
                                                    <a href={posts.thumbnailUrl} className="mb-0 mt-0 ">
                                                        Thumbnail
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        )
        }
        <nav className="d-flex">
            <ul className="pagination m-3">
                {
                    pages.map((page) => (
                        <li className={
                            page === currentPage ? "page-item active" : "page-item"
                        }>
                            <p className="page-link"
                                onClick={() => pagination(page)}
                            >
                                {page}
                            </p>
                        </li>
                    ))
                }
            </ul>
        </nav>
    </div>;
};

export default Posts;