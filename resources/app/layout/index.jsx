import Header from './header'
import Footer from './footer'
import Content from './content'

export default ({
  ...props
}) => (
  <div class="flex flex-col h-screen">
    <Header />
    <Content {...props} />
    <Footer />
  </div>
)
