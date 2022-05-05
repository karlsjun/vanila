import axios from "axios"

export async function getStaticPaths() {
    const eventAPI = await axios.get(
      "http://api-test.tech/wp-json/wp/v2/events/"
    );
    const events = await eventAPI.data;

    const paths = events.map((event) => ({
        params: { slug: event.slug },
    }))
        
    return { paths, fallback: false }
}



export async function getStaticProps({params}) {

  try {
    const eventAPI = await axios.get(
      `http://api-test.tech/wp-json/wp/v2/events?slug=${params.slug}`
    );
    const event = eventAPI.data;

      return { props: { event } }
  } catch (error) {
    return { error };
  }
}

const EventPages = (props) => {
    return (
        <>
            <div className="container mx-auto px-8">
                <h1 className="text-6xl text-center my-8">
                    {props.event[0].title.rendered}
                </h1>
                <div
                    className="prose lg:prose-lg max-w-none mb-12"
                    dangerouslySetInnerHTML={{__html:props.event[0].content.rendered}}
                >
                </div>
                {props.event[0].acf.gallery && 
                    <>
                        <h2 className="text-5xl text-center mb-8">
                            Gallery
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-cols-fr auto-rows-fr gap-8 ">
                            {props.event[0].acf.gallery.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <img src={item.image} className="w-full h-full"/>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                }
            </div>
            
        </>
    )
}

export default EventPages;