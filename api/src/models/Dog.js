const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
//función de prueba
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    imagen: {
      type: DataTypes.STRING,
      isUrl: true,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const palabras = value.toLowerCase().split(' ');
        const nombreTransformado = palabras.map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ');
        this.setDataValue('nombre', nombreTransformado);
      }
    },
    altura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    anios_de_vida: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },

  { timestamps: false },
  );
  sequelize.define('Temperament', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    temperamento: {
      type: DataTypes.STRING,
      allowNull: false,
    }
},
  { timestamps: false },
  );
 sequelize.define('Dogs_Temperaments', {
    DogId: {
      type: DataTypes.TEXT,
      references:{
        model: 'Dog',
        key: 'id',
      }
    },
    TemperamentId: {
      type: DataTypes.TEXT,
      references: {
        model: 'Temperament', 
        key: 'id'
      }
    }
  },
  { timestamps: false },
  );
};




   