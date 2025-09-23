openSidebar = () => {
    const sidebar = document.querySelector('aside');
    if(sidebar.classList.contains('open')){
        sidebar.classList.remove('open');
        return;
    }
    sidebar.classList.add('open');
}


