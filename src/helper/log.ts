import bunyan from 'bunyan';

const log = bunyan.createLogger({
  name: 'this server',
  src: true, 
  // serializers: {
  //   req: bunyan.stdSerializers.req,
  //   res: bunyan.stdSerializers.res
  // },
  streams: [
    {
      type: 'rotating-file',
      path: './log/filelog.log',
      period: '1d', // daily rotation
      count: 3, // keep 3 back copies
    },
  ],
});

export default log;
