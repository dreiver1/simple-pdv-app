<template>
  <div class="q-px-md cover">
    <div id="chart"></div>
  </div>
</template>

<script>
import { onMounted, defineComponent } from 'vue';
import ApexCharts from 'apexcharts';
import { api } from 'src/boot/axios';

export default defineComponent({
  setup() {
    onMounted(async () => {
      try {
        const res = await api.get('/order/full');
        const orders = res.data;

        const dataSummary = orders.reduce((summary, order) => {
          const date = order.date.split('T')[0];
          let dateEntry = summary.find(entry => entry.date === date);

          if (!dateEntry) {
            dateEntry = { date, amount: 0 };
            summary.push(dateEntry);
          }

          order.items.forEach(item => {
            if (item.Product) {
              dateEntry.amount += item.quantity * (item.Product.price - item.Product.discount);
            }
          });

          return summary;
        }, []);

        const dates = dataSummary.map(data => data.date);
        const amounts = dataSummary.map(data => data.amount);

        const options = {
          chart: { type: 'line' },
          series: [{ name: 'sales', data: amounts }],
          xaxis: { categories: dates }
        };

        const chart = new ApexCharts(document.querySelector('#chart'), options);
        chart.render();
      } catch (error) {
        console.error('Failed to fetch order data', error);
      }
    });

    return {};
  }
});
</script>
