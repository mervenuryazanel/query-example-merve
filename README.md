**Thank Vishwas( @CodevolutionWeb) for all these tutorials and sources. 🚀**

*https://www.youtube.com/watch?v=HH68tHPq7tA&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2&index=17&ab_channel=Codevolution*

> Note: In this app, each page is a component that can be routed in the applicaiton.

# Start the applicaiton

### 1. Run the server

```
yarn serve-JSON
```

or

```
npm run serve-JSON
```

### 2. Run the client

```
yarn start
```

or

```
npm start
```

# cacheTime, staleTime

```
useQuery('super-heroes',fetchSuperHeroes,{cacheTime:1000,staleTime:10000})
```

**cacheTime:** Set the time for storing the fetched data in the cache (default is 5 minutes)

**staleTime:** Set the time that how long the data will be kept as fresh (and after that if we open the component a re-fetch will be required) (default is 0)

> note: cacheTime triggers the isLoading but the stale time doesn't. It triggers the isFetching.

# refetchOnMount, refetchOnWindowFocus

```ruby
useQuery('super-heroes',fetchSuperHeroes,{refetchOnMount:true, refetchOnWindowFocus:true})
```

**refetchOnMount:** the data will be refetch on the mount if the data is stale. (default:true)
-If it is false the query will not fetch on the mount.
-If it is 'always' the query fetch data whether the data is stale or not

**refetchOnWindowFocus:** the data will be fetched every time the window has focused. (default:true)

# Polling (refetchInterval, refetchIntervalInBackground)

```ruby
useQuery('super-heroes',fetchSuperHeroes,{refetchInterval:2000, refetchIntervalInBackground:true })
```

**refetchInterval:** the query will continuously refetch at this frequency in milliseconds.
**refetchIntervalInBackground:** If set to true, the query will continue to refetch while their tab/window is in the background. Defaults to false.

# Fetch On Click

First, enable the fetch on the component mount.

```ruby
useQuery('super-heroes',fetchSuperHeroes,{enabled:false})
```

Then inside the onClick of a button, use the **'refetch'** function that React query provides us to fetch the data with query.

```ruby
 <button onClick={refetch}> Fetch The Super Heroes </button>
```

Vola! That's it! 🙂

# Data Transformation

To select a property from the data use the **'select'** option.

```ruby
useQuery('super-heroes',fetchSuperHeroes, { select: (data) => { const heroNames = data.data.map((hero) => hero.name); return heroNames; }})
```

After that inside the component, we can use **heroNames**, cause it refers to the original data.

map function change from this--->

```ruby
{
    data?.data.map((hero) => {
        return <div key={hero.name}> {hero.name} </div>
        }
    )
}
```

to this --->

```ruby
{
    data.map(heroName => {
          return <div key={heroName}>{heroName}</div>
        }
    )
}
```

# Query By Ids

First, we should be able to create a query key for each hero **(['super-hero', heroId])**

```ruby
useQuery(['super-hero', heroId], fetchSuperHero);
```

Here we can define the query key as an array and
give the hero id to it as a second argument.
Secondly, we need to change the fetch function to give it the heroId

```ruby
const fetchSuperHero = (heroId) => { return axios.get(`http://localhost:4000/superHeroes/${heroId}`) }

export const useSuperHeroData = (heroId) => {
return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId));
}
```

_but we can do this simpler like that:_

```ruby
const fetchSuperHero = ({ queryKey }) => {
const heroId = queryKey[1];
console.log("query key:", queryKey);
return axios.get(`http://localhost:4000/superHeroes/${heroId}`)
}
export const useSuperHeroData = (heroId) => {
return useQuery(['super-hero', heroId], fetchSuperHero);
}
```

because react query provides queryKey to us and we can destructure the id from it and use it easily.
And we can use the new hook (**useSuperHeroData**) inside our new page (**RQSuperHero**)

_And don't forget to add the path to the app.js like this:_

```ruby
<Route path='/rq-super-heroes/:heroId' element={<RQSuperHeroPage />} >
</Route>
```

# Dynamic Parallel Queries

If we need to fetch some data from the db and it is dynamic, changing data we should use **dynamic parallel queries** instead of **parallel queries**.
For that, all we need to do is to use '**useQueries**' (_not 'useQuery'_) with ids.
And then we can return the **queryResult**.

```ruby
const fetchSuperHero = (heroId) => {
return axios.get(`http://localhost:4000/superHeroes/${heroId}`);
}
```

```ruby
const queryResults = useQueries( // it returns an array of query results
heroIds.map((id) => {
return {
queryKey: ['super- hero', id],
queryFn: () => fetchSuperHero(id)
}
})
)
console.log("query results", queryResults);
```

# Dependent Queries

Can be used for dependent queries _whenever we need to execute queries sequentially_ (one query is dependent on another query).

First, create a query that find the correct user (with e-mail)
secondly by using the _chnannelId_ that belongs to the user create a second query and fetch channel details.

# Initial Query Data

In the App.js we declared the _queryClient_ before so that **queryClient instance can access the query cache**

```ruby
const queryClient = useQueryClient();
return useQuery(['super-hero', heroId], fetchSuperHero,
{
initialData: () => {
const hero = queryClient.getQueryData('super-heroes')?.data?.find(hero => hero.id === parseInt(heroId)); //get the hero from hero list by id

                   if (hero) {
                       return {
                           data: hero
                       }
                   } else {
                       return undefined;
                   }
               }
});
```

Now if we open RQ Super Hero page and then go to a super hero's detail page we don't see the loading indicator anymore. Cause the datils page has an
initial query data which comes from RQ Super Hero Page's query. But* a background fetching is still processed*.

# Paginated Queries

> Json-server supports paginated parameters.
> _(localhost:4000/colors?\_limit=2&\_page=4 and etc.)_

Configure the fetch function like this:

```ruby
const fetchColors = (pageNumber) => {
return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
}
```

And use a state to hold the page number
const

```ruby
[pageNumber, setPageNumber] = useState(1);
Configure the query key => ['colors', pageNumber]
```

Add two buttons to move forward and back in the pages

```ruby
<button onClick={() => setPageNumber(page => page - 1)} disabled={pageNumber === 1}>Previos Page</button>
<button onClick={() => setPageNumber(page => page + 1)} disabled={pageNumber === 4}>Next Page</button>
```

**That's all!**

> A quick note--> keepPreviousData: query maintains the data from the last successfull fetch when the new data is requested even if the query key has changed

> it can be useful when dealing with tables, etc.

# Infinite Queries

We can use the **getNextPageParam** option to hold page params

```ruby
getNextPageParam: (\_lastPage, pages) => {
    if (pages.length < 4) {
      return pages.length + 1
    } else {
      return undefined //sets hasPage to false
    }
}
```

_(above 4 is page number)_

And use **useInfiniteQuery** to fetch with infinite query

```ruby
const { data, isLoading, error, isError, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(['colors'], fetchColors,
{
getNextPageParam: (\_lastPage, pages) => {
if (pages.length < 4) {
return pages.length + 1
} else {
return undefined //sets hasPage to false
}
}
});
```

- For the rendering data change data?data.map to data?.page.map --->

```ruby
 data?.pages.map((group, index) => {
    return (
        <Fragment key={index}>
        {
            group.data.map((color) => {
                return (
                    <h2 key={color.id}>
                      {color.id}-{color.label}
                    </h2>
                )
            })
        }
        </Fragment>
    )
 })
```

# Mutations

> (Json-server supports post request)

> Use **mutations** to _create, update or delete data_ (useQuery has a hook named **useMutation** already )

_A query key is optional to useMutation_

- First, create a post request to create a super hero in the same custom hook

```ruby
const addSuperHero = (hero) => {
return axios.post("http://localhost:4000/superHeroes", hero);
}
```

- Create and export a hook for adding super hero (useAddSuperHeroData) in your custom hook (useSuperHeroesData) for query.

```ruby
export const useAddSuperHeroData = () => {
return useMutation(addSuperHero)
}
```

- On the RQSuperHeroesPage _define 2 states which holds **name** and **alterEgo** of hero_

```ruby
const [name, setName] = useState('');
const [alterEgo, setAlterEGo] = useState('');
```

- Use **useAddSuperHeroData()** here.

```ruby
const { mutate: addHero } = useAddSuperHeroData(); //(if there are multiple mutations ---> mutations: addHero)
const { mutate } = useAddSuperHeroData(); //(if there is a single mutation it can stay like this---> mutations)
```

- Create a function to handle adding a hero

```ruby
 const handleAddHeroClick = () => {
 console.log({ name, alterEgo });
 const hero = { name, alterEgo };
 addHero(hero);
 }
```

Lastly, create a button to fire the **handleAddHeroClick** function

```ruby
<button onClick={refetch}>Show Heroes</button>
```

**Volaaa!** You can see the new hero after refetch the heroes and also in the db.json

# Query Validation

For example, after we add a super hero we want to show the list of hero be able to update itself.
For that follow these steps:

```ruby
use useQueryClient to access related query key
 const queryClient = useQueryClient();
```

in **useMutation** function add a **onSuccess** option and inside of it invalidate queiry by this:

```ruby
queryClient.invalidateQueries('super-heroes')
```

_by this invalidation react query refetch the '**super-heros**' data_

After that **useAddSuperHeroData** function should be like:

```ruby
export const useAddSuperHeroData = () => {
const queryClient = useQueryClient();
return useMutation(addSuperHero, {
onSuccess: () => { //run after mutation is successful (invalidate query’s method for achieving that.)
queryClient.invalidateQueries('super-heroes'); //by this invalidation react query refetch the 'super-heros' data
}
})
}
```

And again, that's all :)

# Handling Mutation Response

When we create a hero a response returns from the request and it stores the hero's data.
So it might be useful to use this response instead of making a new get request to access the new hero's data.

- response to the post--->

```json
{
  "name": "s",
  "alterEgo": "asds",
  "id": 6
}
```

```ruby
export const useAddSuperHeroData = () => {
const queryClient = useQueryClient();
return useMutation(addSuperHero, {
onSuccess: (data) => {
queryClient.setQueryData('super-heroes',
(oldQueryData) => { // this function automatically receives all query data (what is present in the query cache) as an argument
return {
...oldQueryData,
data: [...oldQueryData.data, data.data]
}})
       }
   })

}

```

> -In the onSuccess function, data is the entire response that turns from post request
> -setQueryData updates the query cache

> To sum it up, with this configuration _there will be no get request after the mutation_

# Optimistic updates

The aim is to create a hero and **update the hero list even before the post request fired.**
If we click the 'Add hero' button first we see the optimistic update and then a background fetch will be processed but from the clientside, there will be no change.

- For achieving this aim we will use three call-back function belonging to the useMutation:

**onMutate**: is called before the mutation function is fired and it basically updates the hero list even before the post request.

**onError**: access query data and that return from the on mutate call back and set the old query data as current data when an error occurs

**onSettled**: ensure the client state is in sync with the server state

```ruby
return useMutation(addSuperHero, {
onMutate: async (newHero) => {
await queryClient.cancelQueries('super-heroes')
const previousData = queryClient.getQueryData('super-heroes')
queryClient.setQueryData('super-heroes',
(oldQueryData) => {
return {
...oldQueryData,
// data: [...oldQueryData.data, newHero.data]
data: [
...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newHero }
],

                   }

               })
       },
       onError: (_error, _hero, context) => {
           queryClient.setQueryData('super-heroes', context.previousData)
       },
       onSettled: () => {
           queryClient.invalidateQueries('super-heroes')
       }
   })

```

# Axios Interceptor

Create a folder called utils in the 'src' directory and it create an axios-utils.js file

In there define a function (maybe named _request_) **that will wrap the axios request and accepts all the options that axios accepts**.

Create an axios client, inside the 'request' function spread out the _axios opitons_, define **authorization token**, **onSucces**, and **onError** callbacks.
And eventually return the client.

```ruby
const client = axios.create({ baseURL: 'http://localhost:4000' }) //an axios client
```

_baseUrl: our json-server url_

_the **request** function wraps the axios request and accepts all the options that axios accepts_

```ruby
export const request = ({ ...options }) => {
client.defaults.headers.common.Authorization = `Bearer token`; // now we can find this bearer token in the header
const onSuccess = (response) => response;
const onError = (error) => {
//optionally you can add additional logging here (if there is an error redirect the home page, etc.)
return error
}

   return client(options).then(onSuccess).catch(onError);

}

```

We can use this interceptor where we make the axios requests before

- Get requests for changes from this

```ruby
const fetchSuperHeroes = () => {
return axios.get("http://localhost:4000/superHeroes")
}
```

to this --->

```ruby
const fetchSuperHeroes = () => {
return request({ url: '/superHeroes' })
}
```

- Or for post requests:

```ruby
const addSuperHero = (hero) => {
return axios.post("http://localhost:4000/superHeroes", hero);
}
```

--->

```ruby
const addSuperHero = (hero) => {
return request({
url: '/superHeroes', method: 'post', data: hero
})
}
```
