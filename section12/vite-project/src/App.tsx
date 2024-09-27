import ChildComp from './ChildComp';

function App() {

  return (
    <>
      <div>
        <h1>hello</h1> 
        <ChildComp message="hello">
          <div>text</div>
        </ChildComp>
      </div>
    </>
  )
}

export default App
