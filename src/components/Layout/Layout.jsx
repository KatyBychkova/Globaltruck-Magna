function Layout({ children }) {
    return (
        <div>
            <div>Header component</div>
            <div>{children}</div>
            <div>Footer component</div>
        </div>
    );
}

export default Layout;
