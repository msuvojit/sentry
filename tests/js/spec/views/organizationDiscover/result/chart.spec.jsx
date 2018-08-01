import React from 'react';
import {shallow} from 'enzyme';

import ResultChart from 'app/views/organizationDiscover/result/chart';

describe('Chart Data', function() {
  const data = {
    data: [
      {
        'exception_stacks.type': 'ZeroDivisionError',
        platform: 'python',
        count: 6,
        time: 1531094400,
      },
      {
        'exception_stacks.type': 'Type Error',
        platform: 'javascript',
        count: 6,
        time: 1531094400,
      },
      {
        'exception_stacks.type': 'Exception',
        platform: 'php',
        count: 6,
        time: 1531094400,
      },
      {
        'exception_stacks.type': 'SnubaError',
        platform: 'python',
        count: 14,
        time: 1531094400,
      },
      {
        'exception_stacks.type': 'ZeroDivisionError',
        platform: 'python',
        count: 20,
        time: 1532070000,
      },
      {
        'exception_stacks.type': 'Type Error',
        platform: 'javascript',
        count: 5,
        time: 1532070000,
      },
      {
        'exception_stacks.type': 'Exception',
        platform: 'php',
        count: 8,
        time: 1532070000,
      },
      {
        'exception_stacks.type': 'SnubaError',
        platform: 'python',
        count: 30,
        time: 1532070000,
      },
    ],
  };
  const query = {
    aggregations: [['count()', null, 'count']],
    fields: ['platform', 'exception_stacks.type'],
  };

  const wrapper = shallow(<ResultChart data={data} query={query} />);

  describe('getLineChartData()', function() {
    const expectedData = {
      chartData: {
        'javascript,Type Error': [6, 5],
        'php,Exception': [6, 8],
        'python,SnubaError': [14, 30],
        'python,ZeroDivisionError': [6, 20],
      },
      dates: ['07-08', '07-20'],
    };

    it('Gets line chart data correctly', function() {
      expect(wrapper.instance().getLineChartData(data.data, query.fields)).toEqual(
        expectedData
      );
    });
  });

  describe('getBarChartData()', function() {
    const expectedData = [
      {
        data: [{category: 'Jul 8th', value: 6}, {category: 'Jul 20th', value: 20}],
        seriesName: 'python,ZeroDivisionError',
      },
      {
        data: [{category: 'Jul 8th', value: 6}, {category: 'Jul 20th', value: 5}],
        seriesName: 'javascript,Type Error',
      },
      {
        data: [{category: 'Jul 8th', value: 6}, {category: 'Jul 20th', value: 8}],
        seriesName: 'php,Exception',
      },
      {
        data: [{category: 'Jul 8th', value: 14}, {category: 'Jul 20th', value: 30}],
        seriesName: 'python,SnubaError',
      },
    ];

    it('Gets bar chart data correctly', function() {
      expect(wrapper.instance().getBarChartData(data.data, query.fields)).toEqual(
        expectedData
      );
    });
  });
});
