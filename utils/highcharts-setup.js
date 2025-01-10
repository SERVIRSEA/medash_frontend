// import Highcharts from 'highcharts';
// import Exporting from 'highcharts/modules/exporting';
// import ExportData from 'highcharts/modules/export-data';

// if (typeof Highcharts === 'undefined') {
//     Exporting(Highcharts);
//     ExportData(Highcharts);
// }
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';

if (typeof Highcharts === 'object') {
    Exporting(Highcharts);
    ExportData(Highcharts);
}

export default Highcharts;
