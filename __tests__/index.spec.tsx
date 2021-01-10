import * as React from 'react'
import {shallow} from 'enzyme'
import IndexPage from '../pages/index'

describe('Pages', () => {
  describe('Index', () => {
    it('should render the Header with the Page Title', function () {
      const wrap = shallow(<IndexPage/>)
      expect(wrap.find('div').text()).toBe('<Head />SalesLoft Challenge by WillSnake')
    })
  })  
})