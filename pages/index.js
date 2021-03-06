import Head from "next/head";
import { getDocsets, truncate, getCheatSheets } from "../src/utils";
import { parseDomain, fromUrl } from "parse-domain";
import { Fragment } from "react";

const Card = ({
  name,
  version,
  "icon@2x": icon2x,
  icon: icon1x,
  author,
  urls,
  cheatsheet = false,
}) => {
  const icon = icon2x || icon1x;
  const authorName = author && author.name;
  const authorLink = author && author.link;
  const type = cheatsheet ? "cheatsheets" : "docsets";
  return (
    <div href={"#" + type + "-" + name} className="card" id={type + "-" + name}>
      <a href={"#" + type + "-" + name}>
        <h3 title={name + " @ " + version}>
          {!!icon && (
            <>
              <img
                src={"data:image/png;base64," + icon}
                alt={name + " icon"}
                title={name + " icon"}
              />
              &nbsp;
            </>
          )}
          {truncate(name, 20)} <br />
          <small>version: {truncate(version, 7)}</small>
        </h3>
      </a>
      {author && (
        <p>
          <strong>Author</strong>: <a href={authorLink}>{authorName}</a>
        </p>
      )}
      <p>
        <strong>Download</strong>:&nbsp;
        {urls.map((url) => {
          const city = parseDomain(fromUrl(url)).subDomains[0];
          return (
            <Fragment key={url}>
              <a key={url} href={url} download={true}>
                {city || "main"}
              </a>{" "}
            </Fragment>
          );
        })}
      </p>
      <p>
        <strong>Feed URL</strong>: <a href={`/api/${type}/` + name}>XML</a>
      </p>
      <p>
        <strong>Feed URL (.xml)</strong>:{" "}
        <a href={`/api/${type}/` + name + ".xml"}>XML</a>
      </p>
    </div>
  );
};

const Home = ({ repos, cheatsheets }) => (
  <div className="container">
    <Head>
      <title>Zeal User Contributions & Cheat Sheets</title>
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <link rel="icon" href="/favicon-16.png" sizes="16x16" type="image/png" />
      <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
      <link rel="icon" href="/favicon-48.png" sizes="48x48" type="image/png" />
      <link rel="icon" href="/favicon-62.png" sizes="62x62" type="image/png" />
      <link
        rel="icon"
        href="/favicon-192.png"
        sizes="192x192"
        type="image/png"
      />
      <meta
        name="description"
        content="Non-Official Zeal User Contributions & Cheat Sheets Repository - Create by xantiagoma"
      ></meta>
    </Head>

    <main>
      <img src="/favicon-192.png" alt="Zeal Logo" className="logo" /> <br />
      <h1 className="title">
        Welcome to
        <br />
        Zeal User Contributions
      </h1>
      <p className="description">
        Non-Official Zeal User Contributions (& Cheat Sheets) Repository
      </p>
      <code>
        Often Heroku's free hours are exceeded, please use{" "}
        <strong>
          <a href="https://zealusercontributions.now.sh/">
            zealusercontributions.now.sh
          </a>
        </strong>{" "}
        instead.
      </code>
      <a href="#docsets">
        <h2 id="docsets">Docsets:</h2>
      </a>
      <div className="grid">
        {repos.map((e) => (
          <Card {...e} key={"docsets-" + e.name} />
        ))}
      </div>
      <a href="#cheatsheets">
        <h2 id="cheatsheets">Cheat Sheets:</h2>
      </a>
      <div className="grid">
        {cheatsheets.map((e) => (
          <Card {...e} cheatsheet={true} key={"cheatsheets-" + e.name} />
        ))}
      </div>
    </main>

    <footer>
      Create by
      <a href="https://github.com/xantiagoma">
        <code>xantiagoma</code>
      </a>
    </footer>
  </div>
);

Home.getInitialProps = async () => {
  const repos = await getDocsets();
  const cheatsheets = await getCheatSheets();
  return { repos, cheatsheets };
};

export default Home;
