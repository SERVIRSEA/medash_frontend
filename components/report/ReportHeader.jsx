import Image from 'next/image';
import Grid from '@mui/material/Grid';

export default function ReportHeader() {
  return (
    <Grid
      container
      sx={{
        width: '100%',
        padding: '15px 15px',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderBottom: '1px solid #ddd', // Optional styling for separation
      }}
    >
      <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div>
          <Image src="/logo-usaid.png" width={120} height={38} alt="USAID" />
        </div>
        <div>
          <Image src="/logo-nasa.svg" width={60} height={40} alt="NASA" />
        </div>
        <div>
          <Image src="/logo-adpc.png" width={70} height={30} alt="ADPC" />
        </div>
      </Grid>
      <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>
          <Image src="/logo-servir-sea.png" width={180} height={26} alt="SERVIR-SEA" />
        </div>
      </Grid>
    </Grid>
  );
}