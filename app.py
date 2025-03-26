from flask import Flask, request, render_template, redirect, url_for
import pandas as pd
import os
from datetime import datetime

app = Flask(__name__)
EXCEL_FILE = "cuentas.xlsx"

sabores = [
    {"Sabor": "banano", "Valor": 5000},
    {"Sabor": "limon", "Valor": 5500},
    {"Sabor": "maracuya", "Valor": 5500},
    {"Sabor": "zanahoria", "Valor": 5500},
    {"Sabor": "manzana", "Valor": 5500},
    {"Sabor": "chocolate", "Valor": 5500},
    {"Sabor": "cafe", "Valor": 5500},
    {"Sabor": "redvelvel", "Valor": 5500}
]

if not os.path.exists(EXCEL_FILE):
    df = pd.DataFrame(sabores)
    df["Cantidad"] = None  # Dejar vacío en lugar de 0
    df["Total"] = 0
    df.to_excel(EXCEL_FILE, index=False)

@app.route("/", methods=["GET", "POST"])
def index():
    df = pd.read_excel(EXCEL_FILE)
    fecha_actual = datetime.now().strftime("%d/%m/%Y")

    if request.method == "POST":
        cantidades = request.form.getlist("cantidad")

        for i, cantidad in enumerate(cantidades):
            try:
                cantidad = int(cantidad) if cantidad.strip() else None  # Dejar vacío si no hay número
                df.at[i, "Cantidad"] = cantidad
                df.at[i, "Total"] = (cantidad or 0) * df.at[i, "Valor"]
            except ValueError:
                df.at[i, "Cantidad"] = None
                df.at[i, "Total"] = 0

        df.to_excel(EXCEL_FILE, index=False)
        return redirect(url_for("index"))

    total_tortas = df["Cantidad"].fillna(0).sum()
    total_valor = df["Total"].sum()

    return render_template("index.html", tabla=df.to_dict(orient="records"), total_tortas=int(total_tortas), total_valor=int(total_valor), fecha_actual=fecha_actual)

@app.route("/terminar_pedido")
def terminar_pedido():
    df = pd.read_excel(EXCEL_FILE)
    fecha = datetime.now().strftime("%d-%m-%Y")
    
    # Guardar archivo con la fecha
    df.to_excel(f"pedido_{fecha}.xlsx", index=False)
    
    # Reiniciar la tabla después de guardar
    df = pd.DataFrame(sabores)
    df["Cantidad"] = None  # Vacío en lugar de 0
    df["Total"] = 0
    df.to_excel(EXCEL_FILE, index=False)
    
    return redirect(url_for("index"))

@app.route("/reiniciar")
def reiniciar():
    df = pd.DataFrame(sabores)
    df["Cantidad"] = None  # Vacío en lugar de 0
    df["Total"] = 0
    df.to_excel(EXCEL_FILE, index=False)
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
