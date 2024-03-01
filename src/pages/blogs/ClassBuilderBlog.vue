
<template>
    <div class="q-ma-xl">
    <div class="text-h4 q-pt-lg q-px-xl">
        Class builder: what's in a hiring spree?
    </div>
    <div class="text-h6 text-weight-light q-pb-md q-px-xl">
        Assessing how far and how fast you can go, and the case for maintaining standards.
    </div>

    <!-- <div class="text-body1 q-pa-md text-weight-normal">
        Owen M. Williams
    </div> -->
    
    <div class="text-body2 q-py-sm q-px-xl text-weight-light">
        What happens when a company goes on a hiring spree?

        Whether driven by 
        <a href="https://www.cnn.com/2023/03/06/tech/taiwan-tsmc-hiring-plans-2023-intl-hnk/index.html" target="_blank">expansion plans</a>, 
        <a href="https://www.reuters.com/technology/us-enterprise-ai-search-startup-glean-raises-200-million-plans-hiring-spree-2024-02-27/" target="_blank"> a new funding round</a>, 
        <a href="https://www.cnn.com/2023/01/22/tech/big-tech-pandemic-hiring-layoffs/index.html" target="_blank">ill-advised pandemic hiring</a>,
        or <a href="https://www.business-standard.com/article/international/twitter-is-done-with-layoffs-ready-to-hire-again-says-elon-musk-122112200309_1.html" target="_blank">a charismatic (maniacal?) CEO's vision</a>, 
        what might an hiring organization want to pay attention to besides butts-in-seats?
        
        Growing teams is obviously one of the primary functions of any people team. But how many new hires do we need and what else should we consider to achieve our goal?
    </div>
    <div class="text-body1 q-pt-xl q-pb-md q-px-xl text-weight-regular">
        1. Building retention into the plan.
    </div>
    <div class="text-body2 q-py-sm q-px-xl text-weight-light">

        One could argue that step 1 is really simply to set a headcount goal and start hiring - and it is - but bear with me. 
        
        Instead of looking at a goal of 500 new hires, why don't we work back from what we want the size of the team to be?
        
        If we only consider attrition / retention, this can be a relatively straightforward calculation: if you hire 100 people and 30% leave, in year 2 (and after hiring a new incoming class), you will have 170 people. Repeat that until you get to your headcount goal:
        <ul>
            <li>In year 3, 51 will leave and 100 will join, leaving the org with 219 FTEs.</li>
            <li>In year 4, 65 will leave and 100 will join, leaving the org with 254 FTEs.</li>
            <li>In year 5, 76 will leave and 100 will join, leaving the org with 278 FTEs.</li>
            <li>And so on...</li>
        </ul>
        

        This makes sense - but what happens when we increase our retention rate by 10%? In the table below, we compare the difference between a 70% and 80% retention rate.

        </div>
        <div class="flex flex-center">


        <table class="q-table" style="width: 50%;">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>70% Retention</th>
                    <th>80% Retention</th>
                    <th>Difference</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="text-align: center; vertical-align: middle;">1</td>
                    <td style="text-align: center; vertical-align: middle;">100</td>
                    <td style="text-align: center; vertical-align: middle;">100</td>
                    <td style="text-align: center; vertical-align: middle;">0</td>
                </tr>
                <tr>
                    <td style="text-align: center; vertical-align: middle;">2</td>
                    <td style="text-align: center; vertical-align: middle;">170</td>
                    <td style="text-align: center; vertical-align: middle;">180</td>
                    <td style="text-align: center; vertical-align: middle;">+10</td>
                </tr>
                <tr>
                    <td style="text-align: center; vertical-align: middle;">3</td>
                    <td style="text-align: center; vertical-align: middle;">219</td>
                    <td style="text-align: center; vertical-align: middle;">260</td>
                    <td style="text-align: center; vertical-align: middle;">+41</td>
                </tr>
                <tr>
                    <td style="text-align: center; vertical-align: middle;">4</td>
                    <td style="text-align: center; vertical-align: middle;">254</td>
                    <td style="text-align: center; vertical-align: middle;">330</td>
                    <td style="text-align: center; vertical-align: middle;">+76</td>
                </tr>
                <tr>
                    <td style="text-align: center; vertical-align: middle;">5</td>
                    <td style="text-align: center; vertical-align: middle;">278</td>
                    <td style="text-align: center; vertical-align: middle;">390</td>
                    <td style="text-align: center; vertical-align: middle;">+112</td>
                </tr>
            </tbody>
        </table>
    </div>

    

    <div class="text-body1 q-pt-xl q-pb-md q-px-xl text-weight-regular">
        2. Finding the right fit.
    </div>
    <div class="text-body2 q-py-sm q-px-xl text-weight-light">
        Too often, the urgency of hiring sprees compromise the quality of new hires. <span class="text-red">SOURCES HERE</span>
        
        The concept of 'fit-for-role' — a grab bag encompassing skills, proficiency, motivation, and cultural alignment — likely has the largest impact on an organizations productivity. 
        
        Assuming a standard distribution of 'fit' across an organization of 10,000 people, we can start to visualize this potential impact. 
        
    </div>
    <div class="text-body2 q-py-sm q-px-xl text-weight-light">

        In the accompanying graph, we compare the productivity levels of FTEs at different 'average fit rates' based on a normal distribution. 
        
        For instance, if 399 of the FTEs (Full-Time Equivalents) are at a 70% fit, they represent a slice of the workforce that meets that specific threshold of productivity.

    </div>
    <div class="text-body2 q-py-sm q-px-xl text-weight-light">

        In this idealized case, (and honestly because we need to simplify somewhere) we can condense this down to a single percentage - the haves and have-nots, you are either a 100% fit or you aren't, Superman or Garfield. 
        
        At a 60% fit rate, we have 600 fully productive FTEs. Increasing the fit rate to 70% boosts this number to 700, and so on. 
        
        That's a pretty roundabout way to get at a simple percentage cut-off, but here we are.

        <div class="flex flex-center full-width">
            <apexchart style="width: 35vw;" type="line" :options="chartOptions" :series="series" />
        </div>        
    </div>
    <div class="text-body1 q-pt-xl q-pb-md q-px-xl text-weight-regular">
        3. Ramping up quickly.
    </div>
        
    <div class="text-body2 q-py-sm q-px-xl text-weight-light">
        There are <a href="https://www.mindtickle.com/blog/ramp-up-time-everything-you-need-to-know-to-support-new-sales-hires/">blogs</a> <a href="https://demodesk.com/resources-guides/ramp-time">abound</a> about <span class="text-red">SOURCES HERE</span> the benefits of quality onboarding, unsurprisingly written by shiny new onboarding products and services.

        The starkest example I can think of for onboarding's impact to the bottom line is in sales. Oftentimes you will see a '30-60-90' ramp, where a new sales reps quota is 
        
        ramped up to certain milestones at the 30, 60, and 90 day mark (e.g., 20% of quota at day 30, 50% at day 60, and 100% at day 90).
    </div>
        
        <div class="text-body2 q-py-sm q-px-xl text-weight-light">
        To double down here, ramp time makes an especially big difference in roles with higher attrition rates - if the average tenure of a sales rep is 18 months, and 6-9 of those months are spent on ramp, that is a massive hit to value.

        Let's consider the stark case of a quick 3 month ramp compared to a slow 9 month ramp for a 20 person sales team. Assuming a fully-ramped quarterly quota of $250,000, we see a difference of ~$4M to our top-line number.

        <div class="flex flex-center">


        <table class="q-table" style="width: 90%;">
            <colgroup>
                <col style="width: 12%;"> <!-- Each of the first 5 columns -->
                <col style="width: 12%;">
                <col style="width: 12%;">
                <col style="width: 12%;">
                <col style="width: 12%;">
                <col style="width: 12%;">
                <col style="width: 28%;"> <!-- Last column, twice as wide -->
            </colgroup>
            <thead>
                <tr>
                    <th>Organization</th>
                    <th>Q1</th>
                    <th>Q2</th>
                    <th>Q3</th>
                    <th>Q4</th>
                    <th>FY</th>
                    <th>Revenue (20 reps)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="text-align: center; vertical-align: middle;">Quick ramp</td>
                    <td style="text-align: center; vertical-align: middle;">$142k</td>
                    <td style="text-align: center; vertical-align: middle;">$250k</td>
                    <td style="text-align: center; vertical-align: middle;">$250k</td>
                    <td style="text-align: center; vertical-align: middle;">$250k</td>
                    <td style="text-align: center; vertical-align: middle;">$892k</td>
                    <td style="text-align: center; vertical-align: middle;">$17.8M</td>
                </tr>
                <tr>
                    <td style="text-align: center; vertical-align: middle;">Slow ramp</td>
                    <td style="text-align: center; vertical-align: middle;">$50k</td>
                    <td style="text-align: center; vertical-align: middle;">$125k</td>
                    <td style="text-align: center; vertical-align: middle;">$250k</td>
                    <td style="text-align: center; vertical-align: middle;">$250k</td>
                    <td style="text-align: center; vertical-align: middle;">$675k</td>
                    <td style="text-align: center; vertical-align: middle;">$13.5M</td>
                </tr>
            </tbody>
        </table>
        </div>


    </div>
    <div class="text-body1 q-pt-xl q-pb-md q-px-xl text-weight-regular">
        The calculator
    </div>
        
    <div class="text-body2 q-py-sm q-px-xl text-weight-light">
        The <router-link  to="/calculators/class-builder">calculator</router-link> is designed to take all three of these considerations in mind and provide a clear assessment of hiring targets
        to achieve a particular goal of <span class="text-weight-medium">fully ramped, and productive</span> FTEs over a certain time frame.

        Building this calculator helped us realize that the true challenge in a hiring spree isn't just about launching a wide net; it's about the hidden headwinds. 
        
        This analysis illuminated how easily resources can be poured into the pursuit of hire-at-all-costs, overlooking the essence of what makes a hire truly valuable in the first place and over the long run.

        Sometimes it still pays to find for the best class vs. the soonest-est class.
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { jStat } from 'jstat';
// import VueApexCharts from 'vue-apexcharts';

// Define the series type
type SeriesType = {
  name: string;
  data: number[];
};

// Define the chart options type
type ChartOptionsType = {
  chart: {
    height?: number | string;
    type: string;
  };
  xaxis: {
    categories: string[];
    tickAmount: number;
    labels: {
      formatter: (value: number) => string;
    };
  };
//   yaxis: {
//     labels: {
//       formatter: (value: number) => string;
//     };
//   };
};

// Series data for the chart
const series = ref<SeriesType[]>([
    {
        name: '60% fit rate',
        data: generateNormalDistributionData(60, 10, 100),
    },
    {
        name: '70% fit rate',
        data: generateNormalDistributionData(70, 10, 100),
    },
  
]);

// Options for the chart
const chartOptions = ref<any>({
  chart: {
    type: 'line',
    height: 'auto',
    colors: ["#6a7e8a;", "#ff6e42"],
    toolbar: {
      show: false // This hides the toolbar
    },
  },
//   stroke: {
//     opacity: 1,
//     colors: ["#6a7e8a;", "#ff6e42"]
//   },
//   colors: ["#6a7e8a;", "#ff6e42"],
  xaxis: {
    categories: Array.from({ length: 100 }, (_, i) => `${i + 1}`),
    tickAmount: 10,
    labels: {
      formatter: (value: number) => `${value - 1}%`,
    },
  },
  yaxis: {
    show: false,
  },
  colors: ["#6a7e8a", "#ff6e42"],
});

// Generate normal distribution data
function generateNormalDistributionData(mean: number, standardDeviation: number, points: number): number[] {
  return Array.from({ length: points }, (_, index) => {
    const x = (index / points) * 100;
    const density = Math.round(jStat.normal.pdf(x, mean, standardDeviation)*10000);
    return density;
  });
}
</script>