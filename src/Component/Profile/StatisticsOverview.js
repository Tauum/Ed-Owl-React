import { useEffect, useState } from 'react';
import Carousel from 're-carousel'
import IndicatorDots from './IndicatorDots'

export default function StatisticsOverview ({parentToChild}) {
    const [executed, setExecuted]=useState(false);

    useEffect(() => {
        if (parentToChild){ setExecuted(true) }
    }, [])
      
    if (executed){
        return (
            <div className='statistics-carousel'>
                <Carousel loop auto widgets={[IndicatorDots]}>

                    <div className='stats-element badge'>
                        {parentToChild.trending === 1 ? <img className="shadow emoj summary" src="/Image/trending-up.svg" alt="" /> : <div></div>}
                        {parentToChild.trending === 0 ? <img className="shadow emoj summary" src="/Image/trending-down.svg" alt="" /> : <div></div>}
                        <h3>{parentToChild.trending === 1 ? <p>Positively</p> : <p>Negatively</p>} trending</h3>
                    </div>

                    <div className='stats-element badge'>
                        <img className="shadow emoj summary" src="/Image/Total-completed.svg" alt=""/>
                        <h3>{parentToChild.totalTaskCompleted}<br/> Tasks completed</h3>
                    </div>

                    <div className='stats-element badge'>

                    <img className="shadow emoj summary" src="/Image/Avg-correct.svg" alt=""/>
                        <h3>{parentToChild.avgTaskScore}%<br/> Avg score</h3>
                    </div>

                    <div className='stats-element badge'>
                        <img className="shadow emoj summary" src="/Image/time-outline.svg" alt=""/>
                        <h3>{(parentToChild.avgTaskTime).toFixed(0)}s<br/> Avg task time</h3>
                    </div>
              </Carousel>
      
            </div>
        )
      }
      else{
          return<div></div>
      }

}
