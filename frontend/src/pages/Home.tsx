import AddTodoSection from "../components/home/AddTodoSection";
import ListSection from "../components/home/ListSection";
import InnerLayout from "../components/layout/InnerLayout";

const Home = () => {
  return (
    <InnerLayout className="pl-10 pr-4 py-4">
      <AddTodoSection />
      <div className="mt-6 border" />
      <ListSection />
    </InnerLayout>
  );
};

export default Home;
