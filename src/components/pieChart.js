import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, Tooltip, ArcElement, plugins } from 'chart.js';
import  { Pie } from "react-chartjs-2";

ChartJS.register(
    Tooltip, ArcElement, plugins
);

function PieChart() {
    const [chartData, setChartData] = useState({datasets: [],});
    const Chart = async () => {
        // get tag data from stack overflow user
        const res = await fetch("https://api.stackexchange.com/2.3/users/1248273/top-tags?site=stackoverflow&filter=!9c6OTSCp6");
        const data = await res.json();
        /*
        // test code to avoide getting to the max quota
        let data = {
            "items":
            [
              {
                "answer_count":37,
                "answer_score":39,
                "question_count":0,
                "question_score":0,
                "tag_name":"html"
              },
              {
                "answer_count":31,
                "answer_score":36,
                "question_count":1,
                "question_score":0,
                "tag_name":"css"
              },
              {
                "answer_count":29,
                "answer_score":26,
                "question_count":1,
                "question_score":0,
                "tag_name":"javascript"
              },
              {
                "answer_count":15,
                "answer_score":24,
                "question_count":2,
                "question_score":0,
                "tag_name":"twitter-bootstrap"
              },
              {
                "answer_count":27,
                "answer_score":22,
                "question_count":0,
                "question_score":0,
                "tag_name":"jquery"
              },
              {
                "answer_count":5,
                "answer_score":17,
                "question_count":0,
                "question_score":0,
                "tag_name":"twitter-bootstrap-3"
              },
              {
                "answer_count":6,
                "answer_score":4,
                "question_count":3,
                "question_score":1,
                "tag_name":"php"
              }
            ],
            "has_more":true,
            "quota_max":300,
            "quota_remaining":300
        };
        */

        // rename tags to more readable names, and combine with similar
        const rename = [
            { old: 'twitter-bootstrap-3', new: 'Bootstrap'},
            { old: 'twitter-bootstrap', new: 'Bootstrap'},
            { old: 'jquery', new: 'jQuery'},
            { old: 'php', new: 'PHP'},
            { old: 'javascript', new: 'Javascript'},
            { old: 'html', new: 'HTML'},
            { old: 'css', new: 'CSS'}
        ];
        data.items = data.items.map(x => {
            let valueCheck = (e) => (e.old === x.tag_name);
            let valueExist = rename.some(valueCheck);
            if (valueExist) {
                let valueIndex = rename.findIndex(valueCheck);
            let newTag = (valueExist) ? rename[valueIndex].new : rename[valueIndex].old;  
            return ({ ...x, tag_name: newTag })
            } else return x
        });

        // merge similar tags, e.g. twitter-bootstrap and twitter-bootstrap-3
        data.items = data.items.reduce(function(accumulator, cur) {
            let tag = cur.tag_name, found = accumulator.find(function(e) {
                return e.tag_name === tag
            });
            if (found) {
                found.answer_score += cur.answer_score;
              found.question_score += cur.question_score;
            }
            else accumulator.push(cur);
            return accumulator;
        }, []);

        // Lets not show top 100 in a little pie, lets show top 6
        data.items = data.items.filter((i, index) => (index < 6));

        // find total score based on good answers and good questions
        let scores = data.items.map((tags) => (tags.answer_score + tags.question_score));
        let sum = scores.reduce((a, b) => a + b, 0);
        
        // reflect percentage instead of raw numbers in tooltip
        let percentages = scores.map((score) => (Math.round(score/sum*100)));

        setChartData({
            labels: data.items.map((tags) => tags.tag_name),
            datasets: [
            {
                label: "Score",
                data: scores,
                backgroundColor: [
                    "#ffbb11",
                    "#ecf0f1",
                    "#50AF95",
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                tooltip: percentages.map((v) => v)
            }
            ]
        });

    };

    // update chart with API response
    useEffect(() => {Chart();}, []);
    
    // beautify the tooltip "LABEL NN%", and align legends to the right
    const options = { 
        plugins: {
            tooltip: {
                callbacks: { 
                    label: (Item) => Item.label + ' ' + (Item.formattedValue) + '%' 
                } 
            },
            legend: {
                display: true,
                position: 'right'
            }
        }
    };
   
    return(
        <div className="App">
            <h1>Tag contributions</h1>
            <div>
                <Pie data = { chartData } options = { options } />
            </div>
        </div>
    )
  }

  export default PieChart;