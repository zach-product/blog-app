import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import TextTruncate from 'react-text-truncate'
import { NavBar } from '..';
import './../../App.css'

const Blog = props => (
    <React.Fragment>
        <Link to={"/blog/"+props.post.endURL}><h2 className="my-4">{props.post.title}</h2></Link>
        {props.post.topics.map((item, index) => {
            return <p key={index} className='btn btn-secondary btn-sm disabled mr-2'>{item}</p>
        })}
        <TextTruncate 
            style={fontStyling}
            line={2}
            truncateText="..."
            text={props.post.content.intro}
            textTruncateChild={<Link to={"/blog/"+props.post.endURL}>Read on</Link>}
        />
        <i style={dateStyling}>{moment(props.post.published).format("MMMM D, YYYY")}</i>
        <hr />
    </React.Fragment>
)

export default class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [ 
                {
                    endURL: "post1",
                    title: 'Lessons learned, back to work!',
                    topics: ['Travel','Life Lessons'],
                    published: "09/06/2019",
                    content: {
                        intro: "It's about time some might say, but stepping away from the daily grind changed my perspective. I left the US a little over a year and a half ago to move to Australia for love. Thanks to my employer and the internet today I worked there remotely for 6 months and then quit to travel with my partner. The decision to take a break from work was incredibly hard, at least as an American (another blog post!). Now, after a full year away, I'm excited to get back to work and bring what I've learned to the table. Here are the highlights:",
                        sections: [
                            {
                                header:"Communication matters",
                                body:"No matter what you do in the world whether it's trekking on the Inca trail, staying in a hostel in Bolivia or taking a boat tour of the Croatian islands, each of these experiences provides a certain level of ‘service’. Communication is the foundation of any service or product. Even when the experience goes completely wrong (the bus breaks down, drive takes twice as long, or luggage gets lost) the way people talk to you gives you a positive or negative view looking back.  Unfortunately, this customer service oriented communication isn't ubiquitous across the world and still serves as a differentiator. Working at an accelerator in San Francisco before traveling, many companies were trying to solve this customer service problem. I racked my brain on this issue as well since it has high operational costs. Asia, in particular, changed my perspective on this issue. Almost every accommodation or service provided a single phone number to contact for anything and everything such as getting stuck in the rain and needing a taxi. A simple solution made my life easier and helped build trust. Essentially, communication provides a personal touch that continues to shape our experiences."
                            },
                            {
                                header: "Tech for more time",
                                body: "Many people, friends and others in western countries tell me that they're busy, life is hard, etc., and that's definitely true in the hyper technology driven world that we live in. Life can be simple though. This lesson didn't come from one isolated experience. After going on multi-day treks, visiting small 'not as connected' towns, and being in simply less technology dependent working environments, I was exposed to a simpler, lower stress and anxiety-inducing daily life. A common theme was less 'distracting' technology, specifically web or mobile applications. Believe it or not, smartphones are everywhere since, well, most of the world has cell service now and they're affordable. On the flip side, several products made traveling, which can be incredibly stressful, much easier. Simplifying daily processes (especially around decision-making) whether booking a hotel, finding a train station, shipping a package, managing a project, etc. helps us finish them quicker, freeing up more of our time. In other words, web or mobile applications have the power to distract us and crowd our headspace, or they can free up our time and headspace, making life simpler."
                            },
                            {
                                header: "Quality over quantity",
                                body: "Humans certainly have figured out how to mass produce lots of cheap stuff. It's incredible how easy it is to get pretty much anything you might need anywhere in the world. Okay, so maybe not in a remote lake village in Nepal. But, drive an hour and voila, everything is at your fingertips for under $10 USD. At first this was great, and I picked up a few items I 'needed.' All of sudden my bag was stuffed and much heavier with more stuff I only wore a couple times. Traveling for a long period really grounds you around the amount and quality of your possessions. Don't get me wrong, I'll always hunt for the lowest price (and still price wins sometimes!), but the amount and quality of products means a lot more. For example, I'm a walking Osprey (bag company) commercial because their bags don't break. Whether it's clothing or web applications, quality means even more in this Amazon-era especially when building a sustainable business."
                            },
                            {
                                header: "Access to education",
                                body: "I'm a product manager for software applications coming from a non-technical background. Part of this break from work was to learn new skills, specifically basic programming. After a bit of simple research it's evident that there are lots of free (or very cheap!) options to learn programming amongst many other skills. Of course, just like anything, you have to spend time to learn a skill, but the ease of access nowadays through a variety of online channels, YouTube, Udemy, etc. is incredible. While finding the time  to learn a new skill isn't easy, it's pretty amazing to know that there's not many skills that are out of reach."
                            },
                            {
                                header: "Relationships run the world",
                                body: "I was always aware of the importance of relationships, especially when it came to my career. It was drilled into me that my network was everything. Travelling opened my eyes to how relationships go beyond career and shape experiences. For example, a couple put me up in their apartment in London for a few days. They probably don’t even know how much that meant to me. I left getting a glimpse into living there, creating new memories with them, and seeing another completely different side of the city. This is one of many experiences. The more I travelled the more I ended up staying in locations for longer periods because building relationships in one place enriched my experiences. In fact, relationships play a role in almost everything I do, whether I’m trying to find a place to stay in a new city, exploring a new direction in life or even writing a blog post! I’m truly grateful for the amazing experiences I’ve had but I’m even more grateful for the people that made them amazing. I hope that my friends feel the same about having a relationship with me."
                            }
                        ],
                        conclusion: "If you can relate to any of what I’ve said above, are curious to know more about my travels, just want to start a new relationship and/or want to talk about product, please don't hesitate to share your email and get in touch in the top right corner!",
                    }
                }
            ]  
        }
    }

    blogList() {
        return this.state.posts.map((currentpost, index) => {
            return  <Blog post={currentpost} key={index} />
        })
    }

    render() { 
        return (
            <React.Fragment>
                <NavBar />
                <div className="container" style={stickyHeader}>
                    <div className="col-12 col-lg-10 offset-lg-1 pt-1">
                        { this.blogList() }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const stickyHeader = {
    marginTop: "calc(70px + 3%)"
}

const fontStyling = {
    fontSize: "18px",
    fontWeight: "300",
    marginBottom: ".75rem"
}

const dateStyling = {
    fontSize: "16px",
    fontWeight: "350"
}