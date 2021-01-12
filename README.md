# SalesLoft Challenge Willsnake

This is the solution for the SalesLoft challenge

## Demo

You can see an example of the app, [here](https://sales-loft-challenge.vercel.app/)

## Requirements

- [Node Js](https://nodejs.org/en/download/) >= **14.15.0**
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) >= **1.22.10**

After the requirements installation, you need to setup the propre environment variables, the project has a sample of the `env.local` file needed by Next Js.

You can run this command tto copy the base file

```bash
cp .env.local.sample .env.local
```

After copying the file, remember to change the value of the variables `SALESLOFT_API_KEY` and `SALESLOFT_API_URL` for some real values.

The value for the `SALESLOFT_API_URL` must poimnt to the url API of from SalesLoft the defaul value is `https://api.salesloft.com/v2/`

The value for the `NEXT_PUBLIC_SALESLOFT_API_URL` must point to the location this project is running the default value is `http://localhost:3000/api/salesloft`

So your final `env.local` file should look something like these:

```bash
SALESLOFT_API_KEY=<real_api_key>
SALESLOFT_API_URL=https://api.salesloft.com/v2/
NEXT_PUBLIC_SALESLOFT_API_URL=http://localhost:3000/api/salesloft
```

## Installation

With `yarn` and `node` previously installed, you can run this command to install it on you machine

```bash
yarn install
```

## Usage

There are several scripts in the `package.json` file, but the one for development is this one

```bash
yarn run dev
```

Once it's up and running, visit [http://localhost:3000](http://localhost:3000) to see the app running

You'll be greeted by a page like these

![Home Page](examples/Page.png 'Home Page')

Here is a brief description of the buttons usage

#### **Load People**

This button is the one that inits the app, press it to load the first bartch of records

![Load People](examples/LoadPeople.png 'Load People')

#### **Load More People**

This button is the one that loads the next batch of records if they exist, if there aren't more records, it will disable itself

![Load More People](examples/LoadMorePeople.png 'Load More People')

#### **Clear People**

This button will remove all the records displayed on the screen, this is used if you want to start again

![Clear People](examples/ClearPeople.png 'Clear People')

#### **Show Table Count**

This button will toggle between showing or hiding a table with the frequency count of the email address of every record shown on the page

![Show Table Count](examples/ShowTable.png 'Show Table Count')

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

Also, please use the `commit` script to commit you code, so it can be processed by commitizen standards
