export class Init {
  load() {
    if (
      localStorage.getItem('tasks') === null ||
      localStorage.getItem('tasks') == undefined
    ) {
      console.log('No hay tareas... creando...');
      let tasks = [
        {
          id: 1,
          title: 'Clases de Angular',
          completed: false,
        },
        {
          id: 2,
          title: 'Descansar',
          completed: false,
        },
        {
          id: 3,
          title: 'Ir al Mercado',
          completed: false,
        },
      ];

      localStorage.setItem('tasks', JSON.stringify(tasks));
      return;
    } else {
      console.log('Encontrando tareas por realizar...');
    }
  }
}
