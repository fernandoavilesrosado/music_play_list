import React, { useEffect, useState } from "react";

//import component
//import Music from "./music.jsx";
import TagMusic from "./tagMusic.jsx";

//create your first component
const BASE_URL = "https://assets.breatheco.de/apis/sound/";
const Home = () => {
	const [playList, setPlayList] = useState([]);
	const [firstSRC, setFirstSRC] = useState({}); //esto tiene que ser un diccionario
	const [currentPosition, setCurrentPosition] = useState(0);

	const fetchApi = async () => {
		const response = await fetch(BASE_URL.concat("songs"), {
			method: "GET"
		});
		const responseJSON = await response.json();
		setPlayList(responseJSON);
	};
	//
	useEffect(() => {
		fetchApi();
	}, []);
	//
	useEffect(() => {
		if (playList.length) {
			//console.log(BASE_URL.concat(playList[0].url));
			setFirstSRC(playList[currentPosition]);
		}
	}, [playList]);
	//
	const previousSong = () => {
		let position = currentPosition - 1;
		setCurrentPosition(position);
		//console.log(playList[position]);

		if (position < playList.length) {
			//setFirstSRC({ ...playList.position, position: position });
			setFirstSRC(playList[position]);
		}
	};

	const nexSong = () => {
		let position = currentPosition + 1;
		setCurrentPosition(position);
		//console.log(playList[position]);

		if (position < playList.length) {
			//setFirstSRC({ ...playList.position, position: position });
			setFirstSRC(playList[position]);
		}
	};
	//
	return (
		<div className="menuPlayer text-center mt-5">
			<div className="title">
				<h1> PLAY LIST</h1>
			</div>

			<div className="listUl">
				<ul>
					{!playList
						? "Cargando play list ..."
						: playList.map((songs, index) => {
								return <li key="music">{songs[index.url]}</li>;
						  })}
				</ul>
			</div>

			<div className="tagaUdio">
				<figure>
					<figcaption>{firstSRC.name}</figcaption>
					<audio controls src={BASE_URL.concat(firstSRC.url)}></audio>
				</figure>
			</div>

			<div className="btns">
				<button className="btn" onClick={() => previousSong()}>
					&laquo; Previous
				</button>
				<button className="btn" onClick={() => nexSong()}>
					Next &raquo;
				</button>
			</div>
		</div>
	);
};

export default Home;
